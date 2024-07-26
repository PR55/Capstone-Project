from .db import db, environment, SCHEMA, add_prefix_for_prod

class ProductReview(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.String(1000), nullable = False)
    rating = db.Column(db.Integer, nullable=False)
    ownerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    productId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    time_created = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
    time_updated = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), onupdate=db.func.now())

    def to_dict(self):
        return{
            'id':self.id,
            'review':self.review,
            'rating':self.rating,
            'owner':self.ownerId,
            'product':self.productId,
            'timeUpdated': self.time_updated
        }
