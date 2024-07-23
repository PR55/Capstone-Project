from .db import db, environment, SCHEMA, add_prefix_for_prod
from enum import Enum

class packageStatus(Enum):
    pending='Pending'
    processing='Processing'
    delivery='Delivery in Progress'
    delivered='Delivered'

class Transaction(db.Model):
    __tablename__ = 'transactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    ownerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    status = db.Column(db.Enum(packageStatus), nullable=False)
    time_created = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
    time_updated = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), onupdate=db.func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'owner' : self.ownerId,
            'status':self.status.value,
            'timeCreated': self.time_created,
            'timeUpdated': self.time_updated,
        }

class TransactionDetail(db.Model):
    __tablename__ = 'transaction_details'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    productId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    transactionId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('transactions.id')), nullable=False)
    time_created = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
    time_updated = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), onupdate=db.func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'productId' : self.productId,
            'transactionId' : self.transactionId,
            'timeCreated': self.time_created,
            'timeUpdated': self.time_updated,
        }
