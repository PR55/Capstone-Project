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
            'isTraditional':self.isTraditional,
            'timeCreated': self.time_created,
            'timeUpdated': self.time_updated,
        }

class Tags(Enum):
    #---Electronic Tags
    nintendo = 'Nintendo'
    nsixfour = 'Nintendo 64'
    switch = 'Nintendo Switch'
    game_boy = 'GameBoy'
    game_boy_color = 'GameBoy Color'
    game_boy_advanced = 'Gameboy Advanced'
    pokemon = 'Pokémon'
    nintendo_ds = 'Nintendo DS'
    gamecube = 'GameCube'
    xbox='Xbox'
    xbox_360='Xbox 360'
    xbox_one='Xbox One'
    xbox_series_x='Xbox Series X'
    playstation = 'Playstation'
    playstation_2 = 'Playstation 2'
    playstation_3 = 'Playstation 3'
    playstation_4 = 'Playstation 4'
    playstation_5 = 'Playstation 5'
    retro = 'Retro'
    coop = 'Co-Op'
    multiplayer = 'Multiplayer'
    pvp = 'PVP'
    pve = 'PVE'
    singleplayer = 'Singleplayer'
    #---Traditional Tags
    hasbro='Hasbro'
    fantasy='Fantasy'
    medieval = 'Medieval'
    ww1 = 'WW1'
    video_game_theme = 'Video Game Theme'
    tcg = 'Trading Card Game'
    modern_warfare = 'Modern Warfare'
    classic = 'Classic'
    civilization = 'Civilization'
    acw = 'American Civil War'
    bluffing = 'Bluffing'
    medical = 'Medical'
    rage = 'Rage Inducing'
    economy = 'Economy'
    party = 'Party Game'
    noire = 'Noire'
    mafia = 'Mafia'
    rp = 'RolePlay'
    racing = 'Racing'
    travel = 'Travel'
    pirates = 'Pirates'
    military = 'Military'
    book = 'Book'
    farming = 'Farming'


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
