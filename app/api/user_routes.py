from flask import Blueprint, jsonify
from flask_login import login_required,current_user
from app.models import User, ProductReview,ProductTag,ProductImage,Product, Article,ArticleTag, Comment

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
def user(id):
    """
    Query for a user by id and returns that user in a dictionary.
    Also returns everything made by the user.
    """
    user = User.query.get(id)

    if not user:
        return {'message':'User does not exist'}, 404

    products= Product.query.filter_by(ownerId = id).all()
    safe_electronics = []
    safe_traditional = []

    for product in products:
        safe_product = product.to_dict()
        safe_product['tags'] = [x.to_dict() for x in ProductTag.query.filter_by(productId = product.id).all()]
        safe_product['image'] = ProductImage.query.filter_by(productId = product.id).first().to_dict()
        safe_product['owner'] = User.query.get(product.ownerId).no_email()
        safe_product['description'] = product.description.split('\n')
        if product.isTraditional:
            safe_traditional.append(safe_product)
        else:
            safe_electronics.append(safe_product)

    safe_user = user.to_dict()
    safe_user['products'] = {
        'electronic':safe_electronics,
        'traditional':safe_traditional
    }

    safe_reviews = []

    for product in products:
        review = ProductReview.query.filter_by(productId = product.id).first()
        if not not review:
            safe_review = review.to_dict()
            safe_review['product'] = product.to_dict()
            safe_review['owner'] = user.no_email()
            safe_reviews.append(safe_review)
    safe_user['reviews'] = safe_reviews

    articles = [x for x in Article.query.filter_by(ownerId = id).all()]
    safe_articles = []

    for article in articles:
        safe_article = article.to_dict()
        safe_article['owner'] = user.no_email()
        safe_article['body'] = article.body.split('\n')
        safe_articles.append(safe_article)

    safe_user['articles'] = safe_articles

    reviewsMade = ProductReview.query.filter_by(ownerId = id).all()

    safe_reviews_made = []

    for review in reviewsMade:
        safe_review = review.to_dict()
        safe_review['owner'] = user.no_email()
        product = Product.query.get(review.productId)
        safe_product = product.to_dict()
        safe_product['image'] = ProductImage.query.filter_by(productId = review.productId).first().to_dict()
        safe_review['product'] = safe_product
        safe_reviews_made.append(safe_review)

    safe_user['madeReviews'] = safe_reviews_made

    safe_comments = []

    for article in articles:
        comments = Comment.query.filter_by(articleId = article.id).all()
        for comment in comments:
            safe_comment = comment.to_dict()
            safe_comment['article'] = article.to_dict()
            safe_comment['user'] = User.query.get(comment.ownerId).to_dict()
            safe_comments.append(safe_comment)

    safe_user['comments'] = safe_comments

    safe_comments_made = []

    commentsMade = Comment.query.filter_by(ownerId = id).all()

    for comment in commentsMade:
        safe_comment = comment.to_dict()
        safe_comment['owner'] = user.no_email()
        article = Article.query.get(comment.articleId)
        safe_article = article.to_dict()
        safe_comment['article'] = safe_article
        safe_comments_made.append(safe_comment)

    safe_user['madeComments'] = safe_comments_made

    return safe_user

@user_routes.route('/products')
@login_required
def user_products():
    '''
        Queries for all products posted by the current user
    '''

    products = [x.to_dict() for x in Product.query.filter_by(ownerId = current_user.id).all()]

    for product in products:
        product['images'] = [x.to_dict() for x in ProductImage.query.filter_by(productId = product['id']).all()]
        tags = [x.to_dict() for x in ProductTag.query.filter_by(productId = product['id']).all()]
        product['tags'] = tags
        product['owner'] = current_user.no_email()
        product['description'] = product['description'].split('\n')

    return {'products':products}

@user_routes.route('/articles')
@login_required
def user_articles():
    '''
        Queries for all articles posted by the current user
    '''

    products = [x.to_dict() for x in Article.query.filter_by(ownerId = current_user.id).all()]

    for product in products:
        tags = [x.to_dict() for x in ArticleTag.query.filter_by(articleId = product['id']).all()]
        product['tags'] = tags
        product['owner'] = current_user.no_email()
        product['body'] = product['body'].split('\n')
        product['comments'] = []

    return {'articles':products}
