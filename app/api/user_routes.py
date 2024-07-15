from flask import Blueprint, jsonify
from flask_login import login_required,current_user
from app.models import User, ProductTag,ProductImage,Product, Article,ArticleTag

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
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

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
        product['owner'] = current_user.to_dict()

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
        product['owner'] = current_user.to_dict()

    return {'articles':products}
