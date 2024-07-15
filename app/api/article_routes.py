from flask import Blueprint, request
from flask_login import login_required, current_user
from app.api.aws_helpers import upload_file_to_s3, get_unique_filename,remove_file_from_s3
from app.models import Article, ArticleTag, User, db, Tags
from app.forms import ArticleForm, ArticleFormUpdate
from app.api.protected_urls import article_images

article_routes = Blueprint('articles', __name__)

@article_routes.route('/')
def all_articles():
    articles = [x.to_dict() for x in Article.query.all()]
    for article in articles:
        article['tags'] = [x.to_dict() for x in ArticleTag.query.filter_by(articleId = article['id']).all()]
        owner = User.query.get(article['owner'])
        article['owner'] = owner.to_dict()
    return {'articles':articles}

@article_routes.route('/<int:id>')
def one_article(id):
    article = Article.query.get(id)
    if not article:
        return {'message':'Article not found'}, 404

    safe_article = article.to_dict()

    safe_article['tags'] = [x.to_dict() for x in ArticleTag.query.filter_by(articleId = id).all()]
    owner = User.query.get(article.ownerId)
    safe_article['owner'] = owner.to_dict()

    return{'article':safe_article}

@article_routes.route('/', methods=['POST'])
@login_required
def new_article():

    form = ArticleForm()
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

        newArticle = Article(
            title = data['title'],
            body = data["body"],
            ownerId = current_user.id,
            articleImage = url
        )

        db.session.add(newArticle)
        db.session.commit()

        for val in data['tags']:
            for x in Tags:
                if x.value == val:
                    new_tag = ArticleTag(
                        tag = x,
                        articleId = newArticle.id
                    )
                    db.session.add(new_tag)
        db.session.commit()

        safe_article = newArticle.to_dict()
        safe_article['owner'] = current_user.to_dict()
        safe_article['tags'] = [x.to_dict() for x in ArticleTag.query.filter_by(articleId = newArticle.id).all()]

        return {'article':safe_article}



    if form.errors:
        return {'message':'Bad Requst', 'errors':form.errors}, 400

@article_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_article(id):
    article = Article.query.get(id)
    if not article:
        return {'message':'Article not found'},404

    if article.ownerId != current_user.id:
        return {'message':'Must be owner of the article'},403

    form = ArticleFormUpdate()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data

        article.title = data['title']
        article.body = data['body']

        if data['changeImage'] == 'true':

            delCheck = True

            if article.articleImage not in article_images:
                delCheck = remove_file_from_s3(article.articleImage)

            if delCheck == True:
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
                article.articleImage = url
            else:
                return {'message':'An aws error occurred', 'errors':delCheck.errors}, 500

        oldTags = ArticleTag.query.filter_by(articleId = id).all()
        for old in oldTags:
            db.session.delete(old)
        db.session.commit()

        for val in data['tags']:
            for x in Tags:
                if x.value == val:
                    new_tag = ArticleTag(
                        tag = x,
                        articleId = id
                    )
                    db.session.add(new_tag)
        db.session.commit()

        safe_article = article.to_dict()
        safe_article['owner'] = current_user

    if form.errors:
        return {"message":'Bad Request', 'errors':form.errors}, 400
