from app.models import ProductImage, Product,db, ProductTag, User
from app.api.aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from flask import Blueprint, request
from app.api.protected_urls import product_images
from flask_login import login_required, current_user
from app.forms import SinglePhotoForm

image_routes = Blueprint('images', __name__)

@image_routes.route('/<int:id>', methods=['POST'])
@login_required
def add_photo(id):
    '''
        Add one photo to the database,
        assigned to the specified product id.
    '''

    product = Product.query.get(id)

    if not product:
        return {'message':'specified product could not be found'}, 404
    elif product.ownerId != current_user.id:
        return {'message':'Must be owner of the product'}, 401

    form = SinglePhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data

        image = data['image']
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)

        if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when you tried to upload
            # so you send back that error message (and you printed it above)
            return {'message':'Upload Failed', 'errors':[upload]}, 500

        url = upload['url']

        new_image = ProductImage(
            image_url = url,
            productId = id
        )
        db.session.add(new_image)
        db.session.commit()

        safe_product = product.to_dict()
        user = User.query.get(safe_product['owner'])
        safe_product['owner'] = user.no_email()
        safe_product['images'] = [x.to_dict() for x in ProductImage.query.filter_by(productId = id).all()]
        safe_product['tags'] = [x.to_dict() for x in ProductTag.query.filter_by(productId = id).all()]

        return {'product':safe_product}

    if form.errors:
        return {'message':'Bad Request','errors':form.errors}, 400

@image_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_one_photo(id):
    '''
        Delete one specific image entry from the database,
        throw error if not logged in and not the owner.
    '''

    image = ProductImage.query.get(id)

    if not image:
        return {'message':'Image could not be found'}, 404

    product = Product.query.get(image.productId)

    if product.ownerId != current_user.id:
        return {'message':'Must be the owner to perform this action'}, 401

    res = True
    if image.image_url not in product_images:
        res = remove_file_from_s3(image.image_url)
    if res == True:
        db.session.delete(image)
    else:
        return {'message':'An AWS error occured', 'errors':res['errors']}, 500

    db.session.delete(image)
    db.session.commit()

    safe_product = product.to_dict()
    safe_product['images'] = [x.to_dict() for x in ProductImage.query.filter_by(productId = product.id).all()]
    tags = [x.to_dict() for x in ProductTag.query.filter_by(productId = product.id).all()]
    safe_product['tags'] = tags
    user = User.query.get(product.ownerId)
    safe_product['owner'] = user.no_email()
    return {'product': safe_product}
