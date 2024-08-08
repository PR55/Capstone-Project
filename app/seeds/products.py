from app.models import (
    db, Product,ProductTag,
    ProductImage, Tags,
    environment, SCHEMA
    )
from sqlalchemy.sql import text

traditionalArr = [
    {
        'name':"Giant Connect 4",
        'description':"The Giant Connect 4 Set is the perfect outdoor game for yard and tailgate parties. It’s the classic gameplay that you know and love only now in jumbo size for outdoor parties and for group gatherings. The Jumbo Connect 4 Set is a great alternative to other giant games like Jenga, offering a unique and exciting gameplay experience. The Connect 4 game set is designed for both adults and kids, making it a versatile option for family fun in the backyard. Outsmart and outwit your opponent in this challenging game of skill and strategy. Whether you're playing with friends or family, this giant game is sure to provide hours of entertainment. This yard game set takes just seconds to set up and start playing! The game is easy to learn and provides endless entertainment for players of all ages. This board game set is made of durable materials that can withstand outdoor elements, ensuring that it can be used for years to come. It's also designed to be easy to set up and play, making it a great option for impromptu backyard games. Set Includes 1 All-Weather Game Board (11 in. D x 46.5 in. W x 40 in. H); 42 Game pieces (in 2 team colors)",
        'price':69.99,
        'isTraditional': True,
        'ownerId':1,
        'tags':[Tags.hasbro, Tags.party],
        'image':'https://elot-bucket.s3.us-east-2.amazonaws.com/giant-connect-4.jpg'

    },
    {
        'name':"Scrabble",
        'description':"How many ways can you spell FUN? Bring back memories -- and create new ones -- with the Scrabble game! For over 70 years, the Scrabble board has been a place for friends and family to gather, play, learn, and reconnect. With the wooden titles, wooden tile racks, and textured gameboard, players can feel the thrill of playing a classic. Players can show off their vocabulary skills as they build words with the wooden letter tiles, and rack up the points with double and triple letter and word scores. The game guide offers different ways to play and strategies according to skill level. This Classic Crossword Game is a fun game for a family game night, a night out with friends, or an indoor activity. It's a fun game for boys, girls, adults, and teens, ages 8 and up. Hasbro Gaming and all related trademarks and logos are trademarks of Hasbro, Inc.",
        'price':39.99,
        'isTraditional': True,
        'ownerId':1,
        'tags':[Tags.hasbro,Tags.classic],
        'image':'https://elot-bucket.s3.us-east-2.amazonaws.com/scrabble.jpg'

    },
    {
        'name':"Monopoly Game: Pokémon Johto Edition",
        'description':"Gotta catch 'em all in this special Pokémon: Johto Edition of the Monopoly game. Join Pikachu, Totodile, Pichu, and other favorite characters on exciting adventures through the Johto region. Travel through all 8 Gyms and battle Gym Leader Pokémon. Trainer Battle and Professor Elm cards can reward players for Pokémon encounters, or bring unexpected surprises. Buy, sell, and trade Poké Marts and Pokémon Centers with other players to a get a powerful Pokémon team and win the game! Short on time? Check out the Speed Rules for faster gameplay. Copyright Pokémon Company International USAopoly is a trademark of USAopoly, Inc. The Hasbro Gaming, Parker Brothers, and Monopoly names and logos, the distinctive design of the gameboard, the four corner squares, the Mr. Monopoly name and character, as well as each of the distinctive elements of the board and playing pieces are trademarks of Hasbro for its property trading game and game equipment.",
        'price':58.46,
        'isTraditional': True,
        'ownerId':1,
        'tags':[Tags.economy, Tags.party, Tags.video_game_theme],
        'image':'https://elot-bucket.s3.us-east-2.amazonaws.com/pokemon-monopoly.jpg'

    },
    {
        'name':"Gloomhaven",
        'description':"Gloomhaven is a game of Euro-inspired tactical combat in a persistent world of shifting motives. Players will take on the role of a wandering adventurer with their own special set of skills and their own reasons for traveling to this dark corner of the world. Players must work together out of necessity to clear out menacing dungeons and forgotten ruins. In the process, they will enhance their abilities with experience and loot, discover new locations to explore and plunder, and expand an ever-branching story fueled by the decisions they make.",
        'price':29.34,
        'isTraditional': True,
        'ownerId':2,
        'tags':[Tags.rp, Tags.fantasy],
        'image':'https://elot-bucket.s3.us-east-2.amazonaws.com/gloomhaven.png'

    },
    {
        'name':"Uno",
        'description':"UNO is the classic and beloved card game that’s easy to pick up and impossible to put down! Players take turns matching a card in their hand with the current card shown on top of the deck either by color or number. Special action cards deliver game-changing moments as they each perform a function to help you defeat your opponents. These include Skips, Reverses, Draw Twos, color-changing Wild and Draw Four Wild cards. You’ll find 25 of each color (red, green, blue, and yellow), plus the eight Wild cards, inside the 108-card deck. If you can’t make a match, you must draw from the central pile! And when you’re down to one card, don’t forget to shout “UNO!” The first player to rid themselves of all the cards in their hand before their opponents wins. It’s Fast Fun for Everyone! Includes 108 cards and instructions. Colors and decorations may vary.",
        'price':19.13,
        'isTraditional': True,
        'ownerId':3,
        'tags':[Tags.classic, Tags.party],
        'image':'https://elot-bucket.s3.us-east-2.amazonaws.com/uno.png'

    },
    {
        'name':"Operation",
        'description':"It's the Operation electronic board game, a game night favorite, featuring hilarious ailments. The patient, Cavity Sam, is a little under the weather. Who can avoid the buzz and help him recover without lighting up his red nose? Players choose a Doctor card with 12 possible wacky anatomy parts to remove. Just steer clear of the sides of the game unit to avoid the dreaded buzzer! If they don't set off the buzzer, they earn the amount of money shown on the back of the card. The player with the best skills and the most money at the end of the game wins. A beloved children's game for ages 6 and up, it's one of the best family games for game night and a laugh-out-loud indoor game for playdates. Looking for fun gifts for kids? Classic board games for families make great gifts for girls and boys any time of the year! Operation and Hasbro Gaming and all related terms are trademarks of Hasbro.",
        'price':9.05,
        'isTraditional': True,
        'ownerId':1,
        'tags':[Tags.hasbro, Tags.classic],
        'image':'https://elot-bucket.s3.us-east-2.amazonaws.com/operation.jpg'

    },
    {
        'name':"The Game of Life",
        'description':"Who will be a video game designer, a secret Agent, or perhaps an inventor? In the game of life game players can make their own exciting choices As they move through the twists and turns of life. This edition includes 31 Career cards to choose from. Move the car token around the gameboard from start to retirement, and experience unexpected surprises, family, vacations, and other milestones of life. Go to College, choose a career, take the family path, have kids, take a ski trip or see what happens when unexpected twists change the game until retirement. Who's headed for wealth and fortune? Play, spin to win and find out! Once everyone reaches the end of the game at retirement, everyone pays their debts and adds up their wealth. The player with the most money at the end of the game wins! Hasbro Gaming and all related terms are trademarks of Hasbro.",
        'price':14.38,
        'isTraditional': True,
        'ownerId':3,
        'tags':[Tags.hasbro, Tags.party],
        'image':'https://elot-bucket.s3.us-east-2.amazonaws.com/game-of-life.jpg'

    },
    {
        'name':"Sorry!",
        'description':"Slide, collide and score to win the Sorry! Game. Kids draw cards to see how far they get to move one of the pawns on the board. If they land on a Slide they can zip to the end and bump their opponents' pawns – or their own! Jump over pawns and hide in the Safety zone where opponents can't go. Kids keep on moving and bumping until they get all three of their pawns from Start to Home. But watch out, because if the pawn gets bumped, Sorry! It's all the way back to Start! Sorry! and all related characters are trademarks of Hasbro.",
        'price':12.44,
        'isTraditional': True,
        'ownerId':2,
        'tags':[Tags.hasbro,Tags.party],
        'image':'https://elot-bucket.s3.us-east-2.amazonaws.com/sorry.jpg'

    }
]

electroArr = [
    {
        'name':"Conker's Bad Fur Day",
        'description':"Conker's Bad Fur Day is a 2001 platform game developed and published by Rare for the Nintendo 64. The game follows Conker, a greedy, hard-drinking red squirrel who must return home to his girlfriend after binge drinking.",
        'price':69.99,
        'isTraditional': False,
        'ownerId':1,
        'tags':[Tags.nsixfour, Tags.nintendo, Tags.retro],
        'image':'https://elot-bucket.s3.us-east-2.amazonaws.com/conkers-bad-fur-day.jpg'

    },
    {
        'name':"Persona 5",
        'description':"A JRPG that blends traditional turn-based combat with life simulation elements. You play as a high school student who, by day, attends classes and builds relationships, and by night, explores the Metaverse to fight supernatural enemies. The game's stylish art, engaging narrative, and deep character development are complemented by a unique combat system that emphasizes strategy and persona fusion. Persona 5's story tackles themes of rebellion and personal growth in a vibrant, anime-inspired setting",
        'price':39.99,
        'isTraditional': False,
        'ownerId':1,
        'tags':[Tags.singleplayer, Tags.pve, Tags.playstation_4],
        'image':'https://elot-bucket.s3.us-east-2.amazonaws.com/persona5.jpg'

    },
    {
        'name':"Dark Souls III",
        'description':"An action RPG set in a dark, gothic world teeming with formidable enemies and intricate lore. As an Undead character, players explore a sprawling interconnected world filled with challenging combat and deep lore. The game's hallmark is its difficulty, requiring precision and strategy in battles against formidable foes. With intricate level design and a rich story, Dark Souls III provides a rewarding experience for those willing to master its demanding gameplay.",
        'price':58.46,
        'isTraditional': False,
        'ownerId':1,
        'tags':[Tags.coop,Tags.multiplayer,Tags.pvp,Tags.pve, Tags.playstation_4],
        'image':'https://elot-bucket.s3.us-east-2.amazonaws.com/darksouls3.jpg'

    },
    {
        'name':"The Witcher 3: Wild Hunt",
        'description':"Step into the shoes of Geralt of Rivia, a monster hunter on a quest to find his adopted daughter and battle the Wild Hunt—a group of spectral riders threatening the world. This RPG offers an expansive open world filled with rich storytelling, complex characters, and morally challenging decisions. The detailed narrative unfolds through main quests and numerous side activities, including hunting beasts, engaging in politics, and unraveling local mysteries. The game's mature themes and intricate plotlines provide a deeply immersive experience.",
        'price':49.34,
        'isTraditional': False,
        'ownerId':2,
        'tags':[Tags.singleplayer, Tags.playstation_5],
        'image':'https://elot-bucket.s3.us-east-2.amazonaws.com/witcher3.jpg'

    },
    {
        'name':"The Legend of Zelda: Breath of the Wild",
        'description':"Explore the vast open world of Hyrule in this critically acclaimed adventure. As Link, awaken from a long slumber to find the kingdom in ruins, facing a dark force that threatens its existence. Solve puzzles, battle enemies, and discover hidden secrets across diverse landscapes—from lush forests to snowy mountains. With a dynamic weather system and day-night cycle, every exploration feels fresh and unique. The freedom to approach challenges in multiple ways, combined with a deep crafting system and engaging side quests, makes this an unforgettable journey.",
        'price':19.13,
        'isTraditional': False,
        'ownerId':3,
        'tags':[Tags.singleplayer, Tags.switch],
        'image':'https://elot-bucket.s3.us-east-2.amazonaws.com/botw.jpg'

    },
    {
        'name':"Control",
        'description':"In this third-person action-adventure game, you play as Jesse Faden, who searches for her missing brother while navigating the mysterious Federal Bureau of Control. The game blends a gripping narrative with supernatural abilities, as Jesse explores the shifting, labyrinthine offices of the Bureau. With telekinesis, levitation, and other psychic powers at her disposal, players solve puzzles, battle hostile entities, and uncover the secrets of the enigmatic organization. Control's atmospheric setting, intriguing storyline, and dynamic combat make it a unique experience.",
        'price':9.05,
        'isTraditional': False,
        'ownerId':1,
        'tags':[Tags.singleplayer,Tags.playstation_5],
        'image':'https://elot-bucket.s3.us-east-2.amazonaws.com/Control.jpg'

    },
    {
        'name':"Outer Wilds",
        'description':"This exploration-focused adventure game places you in a solar system trapped in a time loop. As a young astronaut, you explore various planets, each with its own distinct environment and mysteries. The game emphasizes curiosity and discovery, with puzzles and secrets that unfold as you learn more about the universe’s history and its impending destruction. Outer Wilds’ captivating visuals, open-ended exploration, and deep narrative create a thought-provoking and memorable journey.",
        'price':14.38,
        'isTraditional': False,
        'ownerId':3,
        'tags':[Tags.singleplayer, Tags.playstation_4],
        'image':'https://elot-bucket.s3.us-east-2.amazonaws.com/outerwilds.jpg'

    },
    {
        'name':"Cuphead",
        'description':"A visually stunning run-and-gun game with a distinctive 1930s cartoon art style. Players control Cuphead or Mugman as they navigate challenging, boss-centric levels, fighting a variety of creative enemies. The game features a mix of platforming and intense boss battles, with an emphasis on precision and pattern recognition. Its unique aesthetic, combined with a jazz soundtrack and demanding gameplay, offers a nostalgic yet fresh experience.",
        'price':12.44,
        'isTraditional': False,
        'ownerId':2,
        'tags':[Tags.coop, Tags.xbox_series_x],
        'image':'https://elot-bucket.s3.us-east-2.amazonaws.com/cuphead.jpg'

    },
    {
        'name':"Dead Cells",
        'description':"This roguevania-style action-platformer combines procedurally generated levels with tight, responsive combat. Players navigate a sprawling, interconnected world, battling enemies and collecting upgrades to improve their abilities. Each run offers different challenges and opportunities, with a focus on fast-paced combat and exploration. The game’s fluid movement mechanics, diverse weapon choices, and ever-changing environments create a compelling and replayable experience.",
        'price':23.38,
        'isTraditional': False,
        'ownerId':2,
        'tags':[Tags.singleplayer,Tags.switch],
        'image':'https://elot-bucket.s3.us-east-2.amazonaws.com/dead-cells.jpg'

    },
    {
        'name':"Firewatch",
        'description':"A first-person adventure game set in the Wyoming wilderness, where you play as a fire lookout named Henry. The game focuses on the relationship between Henry and his supervisor, Delilah, communicated through radio conversations. As you explore the forest and investigate strange occurrences, you unravel a deeper mystery and confront personal challenges. Firewatch’s beautiful visuals, engaging narrative, and emotional depth create a captivating experience.",
        'price':56.86,
        'isTraditional': False,
        'ownerId':3,
        'tags':[Tags.playstation_4, Tags.singleplayer],
        'image':'https://elot-bucket.s3.us-east-2.amazonaws.com/firewatch.jpg'

    },
    {
        'name':"Hey You, Pikachu!",
        'description':"For the first time ever, you can actually talk to your favorite Pokemon. Tag along with Pikachu as it goes through its daily routines, taking field trips, going fishing and having picnics, becoming better friends with each passing day. Pikachu will hear and react to the words you say. The more you speak the closer friends you'll be!",
        'price':89.99,
        'isTraditional': False,
        'ownerId':1,
        'tags':[Tags.nsixfour, Tags.nintendo, Tags.retro],
        'image':'https://elot-bucket.s3.us-east-2.amazonaws.com/Hey_You%2C_Pikachu!_Coverart.png'

    },
    {
        'name':"Battletoads",
        'description':"Okay toads! Let's get EVEN! When the evil Dark Queen kidnaps both your best buddy and the best looking girl this side of the Mazallion Star Cluster - what are you gonna do about it? Are you gonna cry? Hide? Call the Starcops? No way! Because you're a BATTLETOAD and BATTLETOADS don't cry, hide or call for help. BATTLETOADS get real MAD - and then they get EVEN! So, strap on your blaster, power-up the Toadster and get on down to the Dark Queen's planet - but, watch out 'toad - this lady's bad, and she's got a whole mess of really nasty surprises lined up for you - like the Psyko Pigs, the Mutant Ratpack, Robo-Manus and the Saturn Toadtrap, to name but a few. You're gonna need all your fighting skills to defeat her - the Battletoad Butt, the Big Bad Boot and the Nuclear Knuckles. Hey, and don't forget to take along the Jet Turbo, the Space Board and the Speed Bike. Because you're gonna need 'em all, 'toad, if you're gonna rescue your friends and get the frog outta there with your green skin intact!",
        'price':109.56,
        'isTraditional': False,
        'ownerId':3,
        'tags':[ Tags.nintendo, Tags.retro],
        'image':'https://elot-bucket.s3.us-east-2.amazonaws.com/Battletoads.jpg'

    },
    {
        'name':"Pokemon Emerald",
        'description':"Immerse yourself in the world of Pokémon with the Pokemon Emerald Version. This classic game offers an exciting adventure in the Hoenn region, where you'll encounter new Pokémon, challenges, and mysteries. Train and battle with your Pokémon to become a Pokémon Champion. The Emerald Version introduces new features, enhancing your gaming experience. Whether you're a Pokémon fan or a gamer looking for a captivating RPG, Pokemon Emerald Version for your gaming console is a fantastic choice.",
        'price':109.56,
        'isTraditional': False,
        'ownerId':3,
        'tags':[ Tags.nintendo, Tags.retro, Tags.pokemon, Tags.game_boy_advanced],
        'image':'https://elot-bucket.s3.us-east-2.amazonaws.com/Pokemon+Emerald.jpg'

    },
    {
        'name':"Pokemon Moon",
        'description':"Embark on a new adventure as a Pokemon Trainer and catch, battle, and trade all-new Pokemon on the tropical islands of a new Region and become a Pokemon Champion!",
        'price':79.56,
        'isTraditional': False,
        'ownerId':2,
        'tags':[ Tags.nintendo, Tags.retro, Tags.pokemon],
        'image':'https://elot-bucket.s3.us-east-2.amazonaws.com/pokemon+moon.jpg'

    },
    {
        'name':"Pokemon Black Version 2",
        'description':"Pokemon Black Version 2 for Nintendo DS continues the Unova region adventure with new characters, areas to explore, and Pok√mon to catch.",
        'price':129.56,
        'isTraditional': False,
        'ownerId':3,
        'tags':[ Tags.nintendo, Tags.retro, Tags.pokemon, Tags.nintendo_ds],
        'image':'https://elot-bucket.s3.us-east-2.amazonaws.com/Pokemon+Black+Version+2.jpg'

    },
    {
        'name':"Pokemon Ultra Sun",
        'description':"Pokemon Ultra Sun for the Nintendo 3DS allows you to embark on an epic adventure with new Pokemon forms, powers, and stories in the tropical Alola region.",
        'price':39.56,
        'isTraditional': False,
        'ownerId':2,
        'tags':[ Tags.nintendo, Tags.retro, Tags.pokemon],
        'image':'https://elot-bucket.s3.us-east-2.amazonaws.com/Pokemon+Ultra+Sun.jpg'

    },
    {
        'name':"Pokemon White Version",
        'description':"Pokemon White Version is a role-playing video game for the Nintendo DS where players collect Pokemon creatures and train them to battle other Pokemon. It takes place in the new Unova region.",
        'price':159.56,
        'isTraditional': False,
        'ownerId':3,
        'tags':[ Tags.nintendo, Tags.retro, Tags.pokemon, Tags.nintendo_ds],
        'image':'https://elot-bucket.s3.us-east-2.amazonaws.com/Pokemon+White+Version.jpg'

    },
    {
        'name':"Super Mario Galaxy",
        'description':'''The ultimate Nintendo hero is taking the ultimate step... out into space. Join Mario as he ushers in a new era of video games, defying gravity across all the planets in the galaxy. When some creature escapes into space with Princess Peach, Mario gives chase, exploring bizarre planets all across the galaxy. Players run, jump and battle enemies as they explore the many planets. For Mario to succeed, gamers will press buttons, swing the Wii Remote and Nunchuk controllers and even use the Wii Remote to point at and drag things on-screen.''',
        'price':19.56,
        'isTraditional': False,
        'ownerId':2,
        'tags':[ Tags.nintendo, Tags.retro],
        'image':'https://elot-bucket.s3.us-east-2.amazonaws.com/SuperMarioGalaxy.jpg'

    },
    {
        'name':"MarioKart",
        'description':"Original case and manual included. MarioKart for the Nintendo Wii, playable on the Wii U.",
        'price':89.56,
        'isTraditional': False,
        'ownerId':1,
        'tags':[ Tags.nintendo, Tags.retro, Tags.multiplayer],
        'image':'https://elot-bucket.s3.us-east-2.amazonaws.com/mariokart-wii.jpg'

    },
    {
        'name':"Super Mario 64",
        'description':'''The game that launched the Nintendo 64 system stands the test of time as one of the first and best exploratory action/adventure games. Guide the legendary plumber through an incredibly vast magical world with never-before-seen movement and camera-angle freedom. Mario's got the moves with graduated speeds of running and walking, jumps, super jumps, bounce attacks, swimming, and more. The more you play, the more moves you'll discover.
This industry milestone game lets gamers play at their own pace, encouraging them to explore new nooks and crannies of its many levels with a Zen-like approach where the journey is as important as the goal. Other N64 games such as Zelda, Banjo-Kazooie, and Donkey Kong 64 all owe much of their inspiration to this gem of a game. A showcase for the system's graphics and processing speed capabilities, Super Mario 64 is a must-have for any N64 owner. --Jeff Young''',
        'price':49.56,
        'isTraditional': False,
        'ownerId':3,
        'tags':[ Tags.nintendo, Tags.retro, Tags.nsixfour],
        'image':'https://elot-bucket.s3.us-east-2.amazonaws.com/Super_Mario_64_box_cover.jpg'

    },
    {
        'name':"Pokemon Diamond Version",
        'description':"The Pokemon Diamond Version Nintendo DS game takes you to the Sinnoh region to catch, train, and battle Pokemon while uncovering the mystery of the Legendary Pokemon Dialga.",
        'price':79.56,
        'isTraditional': False,
        'ownerId':2,
        'tags':[ Tags.nintendo, Tags.retro, Tags.nintendo_ds, Tags.pokemon],
        'image':'https://elot-bucket.s3.us-east-2.amazonaws.com/diamond.jpg'

    },
    {
        'name':"Splatoon 2",
        'description':'''
        The squid kids called Inklings are back to splat more ink and claim more turf in this colorful and chaotic 4-on-4 action shooter. For the first time, take Turf War battles on-the-go with the Nintendo Switch™ system, and use any of the console’s portable play styles for intense local multiplayer* action. Even team up for new 4-player co-op fun in Salmon Run!
        Expect a fresh wave of fashion, not to mention new weapons and gear. Dual wield the new Splat Dualies or stick to mainstays like chargers and rollers, which have been remixed with new strategic possibilities. As always, Turf War is the favored sport among Inklings, but they also dig ranked battles, taking down Octarians in a robust single-player campaign, and battling enemy Salmonids in one dangerous part-time job! No matter which way you play, splat at home or on-the-go with Nintendo Switch. Staying fresh never felt so good.''',
        'price':109.56,
        'isTraditional': False,
        'ownerId':1,
        'tags':[ Tags.nintendo, Tags.switch],
        'image':'https://elot-bucket.s3.us-east-2.amazonaws.com/splatoon2.jpg'

    }
]

def seed_helper(name, description, price, isTraditional ,ownerId, tags=[], baseImage=''):
    testProduct = Product(
        name= name,
        description = description,
        price = price,
        isTraditional = isTraditional,
        ownerId = ownerId,
        isPurchased = False
    )
    db.session.add(testProduct)
    db.session.commit()

    for tag in tags:
        new_tag = ProductTag(
            tag=tag,
            productId=testProduct.id
        )
        db.session.add(new_tag)

    new_image = ProductImage(
        image_url=baseImage,
        productId = testProduct.id
    )

    db.session.add(new_image)
    db.session.commit()

# Adds a demo user, you can add other users here if you want
def seed_products():

    for product in electroArr:
        seed_helper(product['name'], product['description'], product['price'],
                    product['isTraditional'], product['ownerId'], tags=product['tags'], baseImage=product['image'])
    for product in traditionalArr:
        seed_helper(product['name'], product['description'], product['price'],
                    product['isTraditional'], product['ownerId'], tags=product['tags'], baseImage=product['image'])


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
