from app.models import db, Tags, Product, ProductImage, ProductTag
from flask import Blueprint, jsonify
from flask_login import login_required
from app.forms import ProductForm
from app.api.aws_helpers import upload_file_to_s3, get_unique_filename
product_routes = Blueprint('products', __name__)

@product_routes.route('/')
def products():
    product_list = [ x.to_dict() for x in Product.query.all()]
    return {'products':product_list}

@product_routes.route('/<int:id>')
def one_product(id):
    product = Product.query.filter_by(id=id).first()
    if product == None:
        return {'message':'Product not found', 'errors':{'product':'Product does not exist'}}, 404
    return {'product': product.to_dict()}


@product_routes.route('/', methods=['POST'])
@login_required
def new_product():

    form = ProductForm()

    if form.validate_on_submit():
        data = form.data
        image = data['image']
        image.filename = get_unique_filename(image)
        upload = upload_file_to_s3(image)
        print(upload)

        if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when you tried to upload
            # so you send back that error message (and you printed it above)
            return {'message':'Upload Failed', 'errors':[upload]}

        url = upload['url']

        product_new = Product(
            name = data['name'],
            description = data['description'],
            price = data['price'],
            isTraditional = data['isTraditional'],
        )

        db.session.add(product_new)
        db.session.commit()
        image_new = ProductImage(
            image_url = url,
            productId = product_new.id
        )
        db.session.add(image_new)

        tagList = []

        for val in data['tags']:
            for x in Tags:
                if x.value == val:
                    new_tag = ProductTag(
                        tag = x,
                        productId = product_new.id
                    )
                    db.session.add(new_tag)
                    db.session.commit()
                    tagList.append(new_tag.to_dict())

        safe_product = product_new.to_dict()

        safe_product['imageUrl'] = image_new.image_url

        safe_product['tags'] = tagList

        return {'product':safe_product}

    if form.errors:
        return {'message':'Bad Request', 'errors':form.errors}, 400
