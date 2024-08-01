from app.models import db, packageStatus,Transaction, TransactionDetail, Product, ProductImage, User, ProductReview
from flask import Blueprint, jsonify,request
from flask_login import login_required, current_user
from datetime import datetime, timezone, timedelta

transaction_routes = Blueprint('transactions', __name__)

@transaction_routes.route('/')
@login_required
def my_transactions():
    transactions = [x.to_dict() for x in Transaction.query.filter_by(ownerId=current_user.id).all()]
    for transact in transactions:
        details = [x for x in TransactionDetail.query.filter_by(transactionId = transact['id']).all()]
        arr = []
        for detail in details:
            product = Product.query.get(detail.productId)
            safe_product = product.to_dict()
            safe_product['image'] = ProductImage.query.filter_by(productId = product.id).first().to_dict()
            safe_product['owner'] = User.query.get(product.ownerId).to_dict()
            review = ProductReview.query.filter_by(productId = product.id, ownerId=current_user.id).first()
            if not review:
                safe_product['review'] = None
            else:
                safe_product['review'] = review.to_dict()
            arr.append(safe_product)
        transact['products'] = [x for x in arr]
    return {'transactions':transactions}

@transaction_routes.route('/<int:id>')
@login_required
def one_transaction(id):
    transaction = Transaction.query.get(id)
    if not transaction:
        return {'message':'Transaction not found'}, 404
    details = TransactionDetail.query.filter_by(transactionId = transaction.id).all()
    arr = []
    safe_transaction = transaction.to_dict()
    for detail in details:
        product = Product.query.get(detail.productId)
        safe_product = product.to_dict()
        safe_product['image'] = ProductImage.query.filter_by(productId = product.id).first().to_dict()
        safe_product['owner'] = User.query.get(product.ownerId).to_dict()
        review = ProductReview.query.filter_by(productId = product.id, ownerId=current_user.id).first()
        if not review:
            safe_product['review'] = None
        else:
            safe_product['review'] = review.to_dict()
        arr.append(safe_product)
    safe_transaction['products'] = arr
    return {'transaction':safe_transaction}

@transaction_routes.route('/', methods=['POST'])
@login_required
def new_transaction():

    data = request.get_json()
    print('products' in data)
    # return request.data

    if 'products' not in data:
        return {'message':'Bad Request', 'errors': {'products':'Need at least 1 product id'}},400

    arr = []

    for id in data['products']:
        product = Product.query.get(id)
        if not product:
            return {'message':'Bad Request', 'errors':{'products':'Reload basket, product was delisted'}}, 400
        else:
            arr.append(product)

    new_transact = Transaction(
        status = packageStatus.pending,
        ownerId = current_user.id
    )
    db.session.add(new_transact)
    db.session.commit()


    for item in arr:
        new_transact_detail = TransactionDetail(
            productId = item.id,
            transactionId = new_transact.id
        )
        db.session.add(new_transact_detail)
        item.isPurchased = True
    db.session.commit()

    safe_transact = new_transact.to_dict()
    products = [x.to_dict() for x in arr]

    for product in products:
        product['image'] = ProductImage.query.filter_by(productId = product['id']).first().to_dict()

    safe_transact['products'] = products

    return {'transaction':safe_transact}

@transaction_routes.route('/<int:id>', methods = ['PUT'])
@login_required
def update_transaction(id):
    data = request.get_json()
    print('products' in data)
    # return request.data

    if 'products' not in data:
        return {'message':'Bad Request', 'errors': {'products':'Need at least 1 product id'}},400
    transaction = Transaction.query.get(id)

    if not transaction:
        return {'message':'Transaction could not be found'}, 404

    details = [x for x in TransactionDetail.query.filter_by(transactionId = id).all()]

    safeArr = []

    for id2 in data['products']:
        for detail in details:
            if(detail.productId == id2):
                safeArr.append(detail)
                break

    for detail in details:
        if detail not in safeArr:
            product = Product.query.get(detail.productId)
            product.isPurchased = False
            db.session.delete(detail)
            db.session.commit()

    idArr = [x.productId for x in safeArr]

    print(data)

    for id2 in data['products']:
        if id2 not in idArr:
            new_detail = TransactionDetail(
                productId = id2,
                transactionId = transaction.id
            )
            db.session.add(new_detail)
            product = Product.query.get(id2)
            product.isPurchased = True
            db.session.commit()
            idArr.append(id)

    productsArr = []


    for id in idArr:
        product = Product.query.get(id)
        safe_product = product.to_dict()
        safe_product['image'] = ProductImage.query.filter_by(productId = product.id).first().to_dict()
        safe_product['owner'] = User.query.get(product.ownerId).to_dict()
        productsArr.append(safe_product)

    safe_transaction = transaction.to_dict()

    safe_transaction['products'] = [x for x in productsArr]

    return{'transaction':safe_transaction}

@transaction_routes.route('/<int:id>', methods = ['DELETE'])
@login_required
def delete_transaction(id):
    transaction = Transaction.query.get(id)
    if not transaction:
        return {'message':'Transaction not found'}, 404

    details = TransactionDetail.query.filter_by(transactionId = id).all()

    for detail in details:
        product = Product.query.get(detail.productId)
        product.isPurchased = False
        db.session.delete(detail)
        db.session.commit()

    db.session.delete(transaction)
    db.session.commit()

    return {'id':id}

@transaction_routes.route('/update_status', methods = ['PATCH'])
@login_required
def update_status():
    transacts = Transaction.query.filter_by(ownerId = current_user.id).all()
    current = datetime.now()
    for transact in transacts:
        tim = transact.time_created
        print('-' * 20)
        print(tim)
        print('-' * 20)
        print(current)
        print('-' * 20)
        # if(current - tim >= timedelta(seconds=60) and current - tim < timedelta(seconds=80) and transact.status != packageStatus.processing):
        #     transact.status = packageStatus.processing
        # elif(current - tim >= timedelta(seconds=80) and current - tim < timedelta(seconds=90) and transact.status != packageStatus.delivery):
        #     transact.status = packageStatus.delivery
        # elif(current - tim >= timedelta(seconds=90) and transact.status != packageStatus.delivered):
        #     transact.status = packageStatus.delivered
        # db.session.commit()

    return {'verify':'a'}
