from .db import db, environment, SCHEMA, add_prefix_for_prod
from enum import Enum

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(75), nullable=False)
    description = db.Column(db.String(2000), nullable=False)
    price = db.Column(db.Float, nullable = False)
    isTraditional = db.Column(db.Boolean, nullable=False)
    ownerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    time_created = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
    time_updated = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), onupdate=db.func.now())



    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price':self.price,
            'owner' : self.ownerId,
            'isTraditonal':self.isTraditional,
            'timeCreated': self.time_created,
            'timeUpdated': self.time_updated,
        }

class Tags(Enum):
    nintentdo = 'Nintendo'
    nsixfour = 'Nintendo 64'
    switch = 'Nintendo Switch'
    retro = 'Retro'
    coop = 'Co-Op'
    multiplayer = 'Multiplayer'
    pvp = 'PVP'
    pve = 'PVE'

class ProductTag(db.Model):
    __tablename__ = 'product_tags'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    tag = db.Column(db.Enum(Tags), nullable=False)
    productId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'tag': self.tag.value,
            'productId':self.productId
        }

class ProductImage(db.Model):
    __tablename__ = 'product_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String, nullable=False)
    productId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'imageUrl': self.image_url,
            'productId':self.productId
        }
