from .db import db, environment, SCHEMA, add_prefix_for_prod
from .product import Tags

class Article(db.Model):
    __tablename__ = 'articles'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    body = db.Column(db.String(5000), nullable=False)
    ownerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    articleImage = db.Column(db.String, nullable=False)
    time_created = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
    time_updated = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), onupdate=db.func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'title':self.title,
            'body':self.body,
            'owner' : self.ownerId,
            'imageUrl' : self.articleImage,
            'timeCreated': self.time_created,
            'timeUpdated': self.time_updated,
        }


class ArticleTag(db.Model):
    __tablename__ = 'article_tags'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    tag = db.Column(db.Enum(Tags), nullable=False)
    articleId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('articles.id')), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'tag': self.tag.value,
            'productId':self.articleId
        }
