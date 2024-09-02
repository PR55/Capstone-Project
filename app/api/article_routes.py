from flask import Blueprint, request
from flask_login import login_required, current_user
from app.api.aws_helpers import upload_file_to_s3, get_unique_filename,remove_file_from_s3
from app.models import Article, ArticleTag, User, db, Tags, Comment
from app.forms import ArticleForm, ArticleFormUpdate
from app.api.protected_urls import article_images

article_routes = Blueprint('articles', __name__)

@article_routes.route('/')
def all_articles():
    '''
        Get all articles in the database,
        and attach their tags and owners
        to the dictionaries manually
        for the front end.
    '''

    articles = [x.to_dict() for x in Article.query.all()]
    for article in articles:
        article['tags'] = [x.to_dict() for x in ArticleTag.query.filter_by(articleId = article['id']).all()]
        owner = User.query.get(article['owner'])
        text = article['body']
        article['body'] = text.split('\n')
        article['owner'] = owner.to_dict()
        safe_comments = []
        comments = Comment.query.filter_by(articleId = article['id']).all()
        for comment in comments:
            safe_comment = comment.to_dict()
            safe_comment['owner'] = User.query.get(comment.ownerId)
        article['comments'] = safe_comments

    return {'articles':articles}

@article_routes.route('/<int:id>')
def one_article(id):
    '''
        Get a specific article by id,
        packaging the tags and owner
        to its dictionary if the article
        exists for the front end.
    '''

    article = Article.query.get(id)
    if not article:
        return {'message':'Article not found'}, 404

    safe_article = article.to_dict()

    safe_article['tags'] = [x.to_dict() for x in ArticleTag.query.filter_by(articleId = id).all()]
    owner = User.query.get(article.ownerId)
    safe_article['owner'] = owner.to_dict()
    safe_article['body'] = article.body.split('\n')

    safe_comments = []

    comments = Comment.query.filter_by(articleId = id).all()

    for comment in comments:
        safe_comment = comment.to_dict()
        safe_comment['owner'] = User.query.get(comment.ownerId)

    safe_article['comments'] = safe_comments

    return{'article':safe_article}

@article_routes.route('/', methods=['POST'])
@login_required
def new_article():

    '''
        Create a new article, first sends
        an upload request to aws after
        making a unique name. Then makes
        the article entry, and finally
        makes all tags for the article
        in the data base.

        Once this is done, package everything
        like the GET routes, for the sake of uniformity
    '''

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
            return {'message':'Upload Failed', 'errors':[upload]},500

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
        safe_article['body'] = newArticle.body.split('\n')
        safe_article['comments'] = []
        return {'article':safe_article}



    if form.errors:
        return {'message':'Bad Request', 'errors':form.errors}, 400

@article_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_article(id):
    '''
        Update an article entry, applies
        a new title and body, checks
        if the user wants to change
        the image and deletes the old one,
        makes an upload and assigns it
        to the article entry. Proceeds
        to delete all old tags and reapply them
        even if there are no changes as new entries.

        Then requeries everything to repack
        the article for the front end, sending
        the updated object to the store.
    '''
    article = Article.query.get(id)
    if not article:
        return {'message':'Article not found'},404

    if article.ownerId != current_user.id:
        return {'message':'Must be owner of the article'},401

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
        safe_article['owner'] = current_user.to_dict()
        safe_article['tags'] = [x.to_dict() for x in ArticleTag.query.filter_by(articleId = id).all()]
        safe_article['body'] = article.body.split('\n')

        safe_comments = []

        comments = Comment.query.filter_by(articleId = id).all()

        for comment in comments:
            safe_comment = comment.to_dict()
            safe_comment['owner'] = User.query.get(comment.ownerId)

        safe_article['comments'] = safe_comments

        return{'article':safe_article}

    if form.errors:
        return {"message":'Bad Request', 'errors':form.errors}, 400

@article_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_article(id):
    '''
        Delete an article by the id
        after verifying it exists
        and the user is the owner.

        Deletes the image from aws,
        then deletes all objects related
        to the article before deleting itself.
    '''
    user = current_user

    article = Article.query.get(id)

    if not article:
        return {'message':'Article could not be found'}, 404

    if article.ownerId != user.id:
        return {'message':'Not owner of the article'}, 401

    res = True
    if article.articleImage not in article_images:
        res = remove_file_from_s3(article.articleImage)
        if res != True:
            return {'message':'An AWS error occured', 'errors':res['errors']}, 500

    tags = ArticleTag.query.filter_by(articleId = id).all()
    _ = [db.session.delete(x) for x in tags]
    db.session.commit()
    db.session.delete(article)
    db.session.commit()

    return {'id':id}
