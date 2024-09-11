from app.models import db, User, Product, ProductImage, ProductReview
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.forms import ReviewForm

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/')
@login_required
def my_reviews():
    '''
        All reviews belonging to the logged in user
    '''
    reviews = [x.to_dict() for x in ProductReview.query.filter_by(ownerId = current_user.id).all()]
    for review in reviews:
        review['owner'] = current_user.no_email()
        product = Product.query.get(review['product'])
        safe_product = product.to_dict()
        safe_product['image'] = ProductImage.query.filter_by(productId = product.id).first().to_dict()
        safe_product['description'] = product.description.split('\n')
        review['product'] = safe_product

    return {'reviews':reviews}
@review_routes.route('/<int:id>')
def one_review(id):
    '''
        Get one specific review by id
    '''
    review = ProductReview.query.get(id)
    if not review:
        return {'message':'Review does not exist'},404

    product = Product.query.get(review.productId)

    safe_review = review.to_dict()

    safe_product = product.to_dict()

    safe_product['image'] = ProductImage.query.filter_by(productId = product.id).first().to_dict()
    safe_product['owner'] = User.query.get(product.ownerId).no_email()
    safe_product['description'] = product.description.split('\n')

    safe_review['product'] = safe_product
    safe_review['owner'] = User.query.get(review.ownerId).no_email()

    return {'review':safe_review}



@review_routes.route('/user/<int:id>')
def user_reviews(id):
    '''
        All reviews related to
        a user by the productIds.

        Used to calculate the
        average rating for a viewed user.
    '''

    products = Product.query.filter_by(ownerId = id, isPurchased = True).all()
    reviews = []
    for product in products:
        reviewArr = ProductReview.query.filter_by(productId = product.id).all()
        if len(reviewArr) > 0:
            for review in reviewArr:
                safe_review = review.to_dict()
                safe_review['product'] = product.to_dict()
                safe_review['owner'] = User.query.get(id).no_email()
                reviews.append(review.to_dict())
    return {'reviews':reviews}

@review_routes.route('/products/<int:id>', methods=['POST'])
@login_required
def new_review(id):
    '''
        New review for a specific product
    '''
    product = Product.query.get(id)
    if not product:
        return {'message':'Product does not exist'}, 404
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data

        new_review = ProductReview(
            review = data['review'],
            rating = data['rating'],
            ownerId = current_user.id,
            productId = id
        )

        db.session.add(new_review)
        db.session.commit()

        safe_review = new_review.to_dict()
        safe_review['owner'] = current_user.no_email()
        safe_product = product.to_dict()
        safe_product['owner'] = User.query.get(product.ownerId).no_email()
        safe_product['image'] = ProductImage.query.filter_by(productId = id).first().to_dict()
        safe_product['description'] = product.description.split('\n')

        safe_review['product'] = safe_product

        return {'review':safe_review}, 201

    if form.errors:
        return {'message':'Bad Request', 'errors':form.errors}, 400

@review_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_review(id):
    '''
        Update a specific review
    '''

    review = ProductReview.query.get(id)

    if not review:
        return {'message':'Review does not exist'}, 404

    if review.ownerId != current_user.id:
        return {'message':'Not the owner of this review'}, 401

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data

        review.review = data['review']
        review.rating = data['rating']

        db.session.commit()

        product = Product.query.get(review.productId)
        safe_review = review.to_dict()
        safe_review['owner'] = current_user.no_email()
        safe_product = product.to_dict()
        safe_product['owner'] = User.query.get(product.ownerId).no_email()
        safe_product['image'] = ProductImage.query.filter_by(productId = product.id).first().to_dict()
        safe_product['description'] = product.description.split('\n')

        safe_review['product'] = safe_product

        return {'review':safe_review}, 201

    if form.errors:
        return {'message':'Bad Request', 'errors':form.errors}, 400

@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    '''
        Delete a specific review
    '''
    review = ProductReview.query.get(id)

    if not review:
        return {'message':'Review does not exist'}, 404
    elif review.ownerId != current_user.id:
        return {'message':'Not the owner of this review'}, 401

    db.session.delete(review)
    db.session.commit()

    return {'id':id}
