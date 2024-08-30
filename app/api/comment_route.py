from flask import Blueprint, jsonify
from flask_login import login_required,current_user
from app.models import User, Article, Comment, db


comment_routes = Blueprint('comment', __name__)

@comment_routes.route('/')
@login_required
def all_comments():
    '''
        All comments belonging to the current user
    '''

    comments = [x.to_dict() for x in Comment.query.filter_by(ownerId = current_user.id).all()]

    for comment in comments:
        comment['article'] = Article.query.get(comment['article']).to_dict()

    return {"comments":comments}


@comment_routes.route('/<int:id>')
def one_comment(id):
    '''
        One specific comment
    '''

    comment = Comment.query.get(id)

    if not comment:
        return {"Message":"Comment could not be found"},404

    safe_comment = comment.to_dict()

    safe_comment['article'] = Article.query.get(comment.articleId)

    return {"comment":safe_comment}


@comment_routes.route('/user/<int:id>')
def user_comments(id):
    '''
        All comments belonging to the user by the id
    '''

    user = User.query.get(id)

    if not user:
        return {"Message":"User cannot be found"}, 404

    comments = Comment.query.filter_by(ownerId = user.id).all()

    safe_comments = []

    for comment in comments:
        safe_comment=comment.to_dict()

        safe_comment['article'] = Article.query.get().to_dict()

        safe_comments.append(safe_comment)

    return {"comments":safe_comments}


@comment_routes.route('/<int:id>', methods=['POST'])
@login_required
def make_comment(id):
    '''
        Make a comment for the targeted article.
    '''
    article = Article.query.get(id)

    if not article:
        return {"message":"Article does not exist!"}, 404

    if article.ownerId == current_user.id:
        return {"message":"Must not be owner of article to make a comment!"}, 401

    pass

@comment_routes.route('/<int:id>', methods=['POST'])
def make_comment(id):
    '''
        Update a comment
    '''
    comment = Comment.query.get(id)

    if not comment:
        return {"message":"Comment does not exist!"}, 404

    if comment.ownerId != current_user.id:
        return {"message":"Must be owner of comment to edit!"}, 401

    pass

@comment_routes.route('/<int:id>', methods=['DELETE'])
def make_comment(id):
    '''
        Delete a comment
    '''
    comment = Comment.query.get(id)

    if not comment:
        return {"message":"Comment does not exist!"}, 404

    if comment.ownerId != current_user.id:
        return {"message":"Must be owner of comment to delete!"}, 401

    db.session.delete(comment)
    db.session.commit()

    return {"id":id}
