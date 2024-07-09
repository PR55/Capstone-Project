from app.models import (
    db, Product,ProductTag,
    ProductImage, Tags,
    environment, SCHEMA
    )
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_products():
    testProduct = Product(
        name= "Conker's Bad Fur Day",
        description = "Conker's Bad Fur Day is a 2001 platform game developed and published by Rare for the Nintendo 64. The game follows Conker, a greedy, hard-drinking red squirrel who must return home to his girlfriend after binge drinking.",
        price = 69.99,
        isTraditional = False,
        ownerId = 1
    )
    db.session.add(testProduct)

    testTag1 = ProductTag(
        tag = Tags.nsixfour,
        productId = 1
    )

    testTag2 = ProductTag(
        tag = Tags.retro,
        productId = 1
    )

    testTag3 = ProductTag(
        tag = Tags.nintentdo,
        productId = 1
    )

    testImage = ProductImage(
        image_url = 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTvVN8hWRYVuDPjJtKKlYMPVbF53VvrJ0Qnl10LY1Ag0lTJ8CK6eNgNbzzeg0UzRodRwIXX',
        productId = 1
    )

    db.session.add(testTag1)
    db.session.add(testTag2)
    db.session.add(testTag3)
    db.session.add(testImage)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_tags RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product_images"))
        db.session.execute(text("DELETE FROM product_tags"))
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
