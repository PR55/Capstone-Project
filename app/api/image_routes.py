from app.models import ProductImage, Product,db, ProductTag, User
from flask import Blueprint
from flask_login import login_required, current_user

image_routes = Blueprint('images', __name__)

@image_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_one_photo(id):
    image = ProductImage.query.get(id)

    if not image:
        return {'message':'Image could not be found'}, 404

    product = Product.query.get(image.productId)

    if product.ownerId != current_user.id:
        return {'message':'Must be the owner to perform this action'}, 403

    db.session.delete(image)
    db.session.commit()

    safe_product = product.to_dict()
    safe_product['images'] = [x.to_dict() for x in ProductImage.query.filter_by(productId = product.id).all()]
    tags = [x.to_dict() for x in ProductTag.query.filter_by(productId = product.id).all()]
    safe_product['tags'] = tags
    user = User.query.get(product.ownerId)
    safe_product['owner'] = user.to_dict()
    return {'product': safe_product}
