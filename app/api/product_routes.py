from app.models import db, Tags, Product, ProductImage, ProductTag, User
from flask import Blueprint, jsonify,request
from flask_login import login_required, current_user
from app.forms import ProductForm, ProductFormUpdate
from app.api.aws_helpers import upload_file_to_s3, get_unique_filename,remove_file_from_s3
from app.api.protected_urls import product_images

product_routes = Blueprint('products', __name__)


@product_routes.route('/')
def all_products():
    '''
        Grabs all products from the database, and
        packages/queries all required info for the
        front end to display products to the user.
    '''
    products = [ x.to_dict() for x in Product.query.all()]
    for product in products:
        product['images'] = [x.to_dict() for x in ProductImage.query.filter_by(productId = product['id']).all()]
        tags = [x.to_dict() for x in ProductTag.query.filter_by(productId = product['id']).all()]
        product['tags'] = tags
        user = User.query.get(product['owner'])
        product['owner'] = user.to_dict()
    return {'products':products}

@product_routes.route('/<int:id>')
def one_product(id):

    '''
        Grabs one product by the id, manually packaging
        everything for the redux store. Once that is done,
        it is sent to the front end.
    '''

    product = Product.query.filter_by(id=id).first()
    if product == None:
        return {'message':'Product not found', 'errors':{'product':'Product does not exist'}}, 404
    safe_product = product.to_dict()
    safe_product['images'] = [x.to_dict() for x in ProductImage.query.filter_by(productId = id).all()]
    tags = [x.to_dict() for x in ProductTag.query.filter_by(productId = product.id).all()]
    safe_product['tags'] = tags
    user = User.query.get(product.ownerId)
    safe_product['owner'] = user.to_dict()
    return {'product': safe_product}


@product_routes.route('/', methods=['POST'])
@login_required
def new_product():
    '''
        If the form is valid and the user is
        logged in, a new product is posted.

        After uplaoding the image to aws first,
        that way no empty products are inserted
        into the database, the product entry is made.

        After this, the image entry and tags entries are
        processed.

        Finally, everything is packed for the front end,
        so it can be added for the redux store.

    '''

    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        image = data['image']
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        # print(upload)

        if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when you tried to upload
            # so you send back that error message (and you printed it above)
            return {'message':'Upload Failed', 'errors':[upload]}

        url = upload['url']

        state = False

        if data['isTraditional'] != 'false':
             state = True

        product_new = Product(
            name = data['name'],
            description = data['description'],
            price = data['price'],
            isTraditional = state,
            ownerId = current_user.id
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

        safe_product['images'] = [image_new.to_dict()]

        safe_product['tags'] = tagList

        safe_product['owner'] = current_user.to_dict()

        print(form.data)


        return {'product':safe_product}

    if form.errors:
        return {'message':'Bad Request', 'errors':form.errors}, 400

@product_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_product(id):

    '''
        If the product exists, the user is the owner,
        and the form is valid, several steps are taken
        for updating a product.

        First all data for the product is forcefully
        updated. This includes the name, description,
        price, and the isTraditional boolean.

        Then it is checked if deleting all images and if
        a new one is being added. If so, delete all
        unprotected images from aws, and all of their
        related entries. Once done, upload the new
        image, and make an entry in the database.

        Following this, all tags are deleted for
        a product and then recreated as new entries
        in the database, even if there are no changes.

        Finally, everything is packed to update the info
        of the redux store in the front end.
    '''

    product = Product.query.get(id)

    if product == None:
        return {'message':'Product Not Found'}, 404
    elif product.ownerId != current_user.id:
        return {'message':'Unauthorized access, not owner of this product'}, 401

    form = ProductFormUpdate()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        state = False

        if data['isTraditional'] != 'false':
             state = True
        product.name = data['name']
        product.description = data['description']
        product.price = data['price']
        product.isTraditional = state
        db.session.commit()
        images = ProductImage.query.filter_by(productId = id).all()
        print(data)
        if data['deleteImages'] == 'true':
            # return {'message':'preventatinve test', 'errors':{'image':'test'}},400
            for index, image in enumerate(images):
                if data['addImage'] == 'true':
                    res = True
                    if image.image_url not in product_images:
                        res = remove_file_from_s3(image.image_url)
                    if res == True:
                        db.session.delete(image)
                        db.session.commit()
                    else:
                        return {'message':'An AWS error occured', 'errors':res['errors']}, 500
                elif index != 0:
                    res = remove_file_from_s3(image.image_url)
                    if res == True:
                        db.session.delete(image)
                        db.session.commit()
                    else:
                        return {'message':'An AWS error occured', 'errors':res['errors']}, 500

        if data['addImage'] == 'true':
            image = data['image']
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
        # print(upload)

            if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when you tried to upload
            # so you send back that error message (and you printed it above)
                return {'message':'Upload Failed', 'errors':[upload]}

            url = upload['url']
            new_image = ProductImage(
                image_url = url,
                productId = id
            )
            db.session.add(new_image)
            db.session.commit()

        tags = ProductTag.query.filter_by(productId = id).all()

        for tag in tags:
            db.session.delete(tag)
        db.session.commit()

        for val in data['tags']:
            for x in Tags:
                if x.value == val:
                    new_tag = ProductTag(
                        tag = x,
                        productId = id
                    )
                    db.session.add(new_tag)
                    db.session.commit()

        safe_product = product.to_dict()
        safe_product['images'] = [x.to_dict() for x in ProductImage.query.filter_by(productId = id).all()]
        safe_product['owner'] = current_user.to_dict()
        safe_product['tags'] = [x.to_dict() for x in ProductTag.query.filter_by(productId = id).all()]
        return {'product':safe_product}



    if form.errors:
        return {'message':'Bad Request', 'errors':form.errors}, 400


@product_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_product(id):
    '''
        If the current user is the owner
        of the product listing, and the
        product exists it does multiple
        things for deletion.

        First, it deletes all associated images
        from aws and the references in the database.

        Second, all tags are deleted from the database
        for this product.

        Finally, it deletes the product and returns the
        id so it can be removed from the redux store.
    '''

    user = current_user

    product = Product.query.get(id)

    if not product:
        return {'message':'Product not found'}, 404

    if product.ownerId != user.id:
        return {'message':'Not the owner of the product post.'}, 403

    images = ProductImage.query.filter_by(productId = id).all()

    for image in images:
        res = True
        if image.image_url not in product_images:
            res = remove_file_from_s3(image.image_url)
        if res == True:
            db.session.delete(image)
        else:
            return {'message':'An AWS error occured', 'errors':res['errors']}, 500

    tags = ProductTag.query.filter_by(productId = id).all()
    _ = [db.session.delete(x) for x in tags]

    db.session.commit()

    db.session.delete(product)
    db.session.commit()

    return {'id':id}
