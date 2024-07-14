from app.models import (
    db,Article, ArticleTag, Tags,
    environment, SCHEMA
    )
from sqlalchemy.sql import text

articleArr = [
    {
        'title':'E3 2024 Highlights: Top 5 Must-Play Games Revealed',
        'body':'''
The Electronic Entertainment Expo (E3) 2024 has just concluded, leaving gamers buzzing with excitement over the new and upcoming titles showcased. This year’s event was packed with revelations, but five games have particularly stood out as must-plays for the year ahead.

"Starfall Legends" emerged as a standout with its grand sci-fi narrative and expansive universe. Set in a richly detailed galaxy, the game invites players to explore alien worlds, engage in epic space battles, and make choices that impact the story’s outcome. The developer’s focus on storytelling and exploration promises a deep, immersive experience.

"Shadow Realm Chronicles" captivated attendees with its dark fantasy setting and visually stunning graphics. The game’s intricate combat system and immersive world design, set in a realm plagued by shadow creatures, offer players a challenging yet rewarding adventure as they strive to restore light and balance to the world.

"Cyber Vanguard" has captured attention with its futuristic dystopian cityscape and dynamic combat mechanics. The first-person shooter features cyber-enhanced soldiers and a complex environment where strategic planning and quick reflexes are crucial. The game’s advanced AI and visual effects are set to deliver a fresh take on the shooter genre.

"Aetherian Odyssey" showcased an open-world exploration game set in a beautifully crafted fantasy realm. With a focus on non-linear storytelling and environmental puzzles, the game promises a relaxing and engaging experience as players unravel the mysteries of the world and interact with its diverse inhabitants.

"Galactic Empires: Rebirth" impressed with its grand strategy mechanics. Players will have the opportunity to build and manage their own space empire, balancing diplomacy, warfare, and resource management. The game’s depth and strategic elements are poised to attract fans of the genre and offer countless hours of gameplay.

E3 2024 has certainly set a high bar with these exciting new titles, each offering something unique and engaging for gamers to look forward to.
''',
        'ownerId':1,
        'tags':[Tags.nintendo, Tags.playstation],
        'image':'https://elot-bucket.s3.us-east-2.amazonaws.com/e3.jpg',
    },
    {
        'title':'Nintendo’s New Switch Model: What to Expect',
        'body':'''Nintendo has recently unveiled its latest innovation in gaming hardware: the Nintendo Switch Pro. This new model promises to elevate the gaming experience with a series of noteworthy upgrades designed to enhance both handheld and docked gameplay.

One of the most anticipated features of the Switch Pro is its improved display. The console will come equipped with a 7-inch OLED screen, offering better color accuracy and contrast compared to the original model. This upgrade aims to make handheld gaming more immersive and visually appealing.

Under the hood, the Switch Pro boasts a more powerful NVIDIA chipset. This advancement promises smoother graphics and faster load times, supporting 4K resolution when the console is docked. Gamers can expect a more seamless and visually impressive experience whether they’re playing on the go or on their TV.

Battery life has been a common concern among Switch users, and the Switch Pro addresses this with an optimized battery. Players can look forward to extended gaming sessions between charges, which is a welcome improvement for those who enjoy long play sessions away from home.

The redesigned dock is another highlight, featuring additional USB ports and an Ethernet port. These enhancements will improve connectivity and provide a more stable online gaming experience, addressing one of the key criticisms of the original dock.

Finally, the upgraded Joy-Con controllers have been refined for better ergonomics and haptic feedback. The new design aims to enhance comfort during extended play and improve the overall responsiveness of the controllers.

With these exciting updates, the Nintendo Switch Pro is set to offer a more polished and enhanced gaming experience, continuing Nintendo’s tradition of innovation in the gaming hardware space.''',
        'ownerId':1,
        'tags':[Tags.nintendo, Tags.switch],
        'image':'https://elot-bucket.s3.us-east-2.amazonaws.com/switch_pro.jpg',
    },
    {
        'title':'PlayStation 5 VR2: Revolutionary Changes Ahead',
        'body':'''Sony has officially introduced the PlayStation VR2 (PSVR2), the next generation of virtual reality gaming for the PlayStation 5. Set to launch later this year, the PSVR2 is packed with groundbreaking features aimed at redefining immersive gaming.

At the heart of the PSVR2’s innovations is its 4K HDR display. Each eye will benefit from a 4K OLED screen, providing vibrant visuals and deep contrast that enhance the sense of immersion in virtual environments. This high-resolution display promises to make VR experiences more lifelike and engaging.

The new headset also includes advanced tracking technology. With inside-out tracking and integrated cameras, the PSVR2 eliminates the need for external sensors, resulting in more accurate and seamless tracking of player movements. This improvement is expected to make gameplay more intuitive and responsive.

Building on the success of the DualSense controller, the PSVR2 features adaptive triggers and haptic feedback. These enhancements provide a more tactile experience, allowing players to feel the impact and texture of virtual objects, adding a new layer of realism to the gameplay.

Comfort has been a key focus in the design of the PSVR2. The headset features adjustable lenses and a more ergonomic fit, ensuring that players can enjoy extended play sessions without discomfort. This attention to ergonomics aims to make VR gaming more accessible and enjoyable for all users.

The PSVR2’s launch lineup includes highly anticipated titles such as "Horizon Call of the Mountain" and "Resident Evil Village VR." These exclusive games are designed to showcase the capabilities of the new hardware and offer players immersive experiences.

With its cutting-edge features and exclusive content, the PSVR2 is poised to elevate the virtual reality landscape and offer a new level of immersion for PlayStation 5 owners.''',
        'ownerId':1,
        'tags':[Tags.playstation, Tags.playstation_5],
        'image':'https://elot-bucket.s3.us-east-2.amazonaws.com/psvr2.jpg',
    },
    {
        'title':'Microsoft Acquires Bethesda',
        'body':'''In a landmark move, Microsoft has finalized its acquisition of ZeniMax Media, the parent company of Bethesda Softworks. This strategic acquisition is set to have far-reaching implications for the Xbox ecosystem and the broader gaming industry.

One of the most significant outcomes of the acquisition is that future Bethesda titles will be available exclusively on Xbox and PC. This includes highly anticipated releases like "Starfield" and the next installment in "The Elder Scrolls" series. Xbox players can look forward to exclusive content and experiences from one of the most renowned RPG developers.

Additionally, Bethesda’s extensive library will be added to Xbox Game Pass, giving subscribers access to a wide range of classic and new titles. This move enhances the value of Xbox Game Pass, making it an even more attractive option for gamers seeking a diverse selection of games.

The acquisition also allows Microsoft to integrate Bethesda’s development resources into its own studios. This collaboration could lead to more ambitious and polished games, as Bethesda’s expertise in creating immersive worlds and complex narratives merges with Microsoft’s resources and technology.

By acquiring Bethesda, Microsoft has strengthened its position in the gaming industry, offering a more compelling value proposition for Xbox and Game Pass users. This acquisition represents a significant shift in the competitive landscape and underscores Microsoft’s commitment to expanding its gaming ecosystem.''',
        'ownerId':1,
        'tags':[Tags.xbox],
        'image':'https://elot-bucket.s3.us-east-2.amazonaws.com/xbox-bethesda-image.jpg',
    },
    {
        'title':'Fortnite’s New Chapter: Major Map Changes',
        'body':'''Epic Games has launched a new chapter for "Fortnite," introducing significant changes to the game’s map and gameplay mechanics. This new chapter aims to refresh the experience and offer players new and engaging content.

The update features an entirely new map, which includes diverse biomes such as lush forests, icy tundras, and futuristic cities. Each area offers unique gameplay opportunities and challenges, encouraging players to explore and adapt their strategies to different environments.

One of the major changes in this chapter is the overhaul of building mechanics. The building system has been refined to balance gameplay and reduce building spam. New structures and materials have been introduced, providing players with fresh strategic possibilities and enhancing the overall gameplay experience.

The new chapter also brings an expanded storyline, with interactive events and challenges that will unfold over time. This dynamic narrative involves players in a continually evolving story, adding depth and immersion to the game.

New gameplay mechanics, such as the ability to use vehicles for traversal and combat, have been introduced. These additions offer players new ways to engage with the game and enhance their tactical options.

Special collaboration events with popular franchises are also part of the update. These events offer exclusive cosmetics and in-game content, providing players with unique rewards and experiences.

The new chapter aims to refresh "Fortnite" with innovative changes and exciting new content, keeping the game engaging and relevant for its dedicated fanbase.''',
        'ownerId':1,
        'tags':[Tags.switch,Tags.playstation,Tags.xbox],
        'image':'https://elot-bucket.s3.us-east-2.amazonaws.com/fortnite.jpg',
    },
    {
        'title':'Elden Ring: Game of the Year Contender',
        'body':'''FromSoftware’s highly anticipated RPG, "Elden Ring," has been released to critical acclaim and is quickly emerging as a strong contender for Game of the Year. The game’s innovative design and compelling gameplay have garnered significant attention from both critics and players.

One of the game’s standout features is its expansive open world. "Elden Ring" offers a vast and intricately designed environment that encourages exploration and discovery. The game combines FromSoftware’s signature challenging gameplay with a rich open-world setting, providing players with a deep and immersive experience.

The collaborative storytelling, developed in conjunction with George R.R. Martin, adds a unique dimension to the game’s narrative. The rich lore and intricate plot contribute to the overall depth of the experience, engaging players with a captivating story.

Combat in "Elden Ring" is dynamic and versatile, allowing players to engage in battles with a variety of weapons and abilities. The game’s flexible combat system supports different playstyles and tactics, adding to the overall strategic depth.

The visual and artistic design of "Elden Ring" has been praised for its beauty and attention to detail. The game’s graphics create a visually stunning world that enhances the sense of immersion and engagement.

Early reviews have highlighted the game’s impressive scale, challenging gameplay, and engaging story, positioning it as a potential Game of the Year. "Elden Ring" is set to make a significant impact on the gaming landscape with its innovative approach and high-quality design.''',
        'ownerId':1,
        'tags':[Tags.playstation,Tags.xbox],
        'image':'https://elot-bucket.s3.us-east-2.amazonaws.com/elden-ring.jpg',
    },
    {
        'title':'Apex Legends Season 10: New Map and Features',
        'body':'''Respawn Entertainment has launched Season 10 of "Apex Legends," introducing a wealth of new content and features that promise to shake up the battle royale experience. This season brings several exciting changes and additions that are set to enhance gameplay and keep players engaged.

One of the most notable additions is the new map, "Olympus." This futuristic cityscape features diverse environments and verticality, offering fresh strategic opportunities for players. The map’s design encourages exploration and tactical play, with new areas to discover and challenges to overcome.

Season 10 also introduces a new legend, "Ash." Ash is a versatile character with unique abilities designed to assist teammates and disrupt enemies. Her tactical grenade and ultimate ability, which allows players to teleport across the map, add new dynamics to team strategies and combat.

In addition to the new legend, several weapons have been rebalanced, and new attachments have been introduced. These changes provide players with more customization options and tactical choices, enhancing the overall gameplay experience.

The update includes a variety of limited-time events and challenges, offering players unique rewards and incentives to engage with the new content. These events are designed to keep the game fresh and exciting, providing players with new goals and achievements.

Quality of life improvements, including various bug fixes and performance enhancements, are also part of the update. These changes aim to improve the overall gameplay experience and address any issues that may have impacted players.

Season 10 of "Apex Legends" is set to reinvigorate the game with new challenges and experiences, offering players fresh content and exciting gameplay opportunities.''',
        'ownerId':3,
        'tags':[Tags.switch, Tags.playstation, Tags.xbox],
        'image':'https://elot-bucket.s3.us-east-2.amazonaws.com/apex-legends.jpg',
    },
    {
        'title':'Valorant’s New Agent: A Game-Changer',
        'body':'''Riot Games has introduced a new agent to "Valorant," and the addition is already making waves in the competitive scene. The new agent, "Echo," brings a range of unique abilities that are set to change the dynamics of gameplay.

Echo is a support character with abilities designed to assist teammates and disrupt enemies. Her tactical grenade provides strategic advantages, while her ultimate ability allows players to deploy a powerful area-of-effect debuff. These abilities introduce new tactical possibilities and add depth to team strategies.

The introduction of Echo has prompted Riot Games to make several balance adjustments to existing agents and weapons. These changes are aimed at refining gameplay and ensuring a competitive balance, addressing player feedback and enhancing the overall experience.

In professional play, Echo has already begun to make an impact. Teams are exploring new strategies and incorporating Echo into their compositions, showcasing her potential to influence high-stakes matches.

The arrival of Echo represents a significant shift in the gameplay dynamics of "Valorant," offering players fresh opportunities and strategies. Her abilities are expected to add new dimensions to both casual and competitive play, making her a noteworthy addition to the roster.''',
        'ownerId':2,
        'tags':[Tags.pvp,Tags.multiplayer],
        'image':'https://elot-bucket.s3.us-east-2.amazonaws.com/valorant.jfif',
    },
    {
        'title':'Horizon Forbidden West: Expanding the Horizon',
        'body':'''The sequel to "Horizon Zero Dawn," "Horizon Forbidden West," has been released, building on the success of its predecessor with a range of exciting new features and improvements. The game promises to offer an enriched experience for fans of the series.

One of the major highlights of "Horizon Forbidden West" is its expanded world. The game introduces new regions to explore, including underwater environments and lush, overgrown landscapes. This expanded world provides players with more diverse and immersive exploration opportunities.

Gameplay mechanics have been enhanced to offer a more fluid and engaging experience. Improvements include expanded crafting options and the introduction of new machine types that challenge players in novel ways. These enhancements aim to make the gameplay more dynamic and rewarding.

The game’s narrative continues Aloy’s journey as she uncovers new mysteries and confronts powerful foes. The story builds on the rich lore established in the first game, offering players a captivating continuation of the protagonist’s adventures.

Visually, "Horizon Forbidden West" showcases significant upgrades, with stunning environments and detailed character models. The game’s improved graphics contribute to a more immersive and visually impressive experience.

Early reviews highlight the game’s engaging gameplay, captivating story, and impressive graphics, establishing it as a standout title. "Horizon Forbidden West" is set to capture the imagination of players with its expanded world and refined gameplay.''',
        'ownerId':3,
        'tags':[Tags.playstation, Tags.playstation_5],
        'image':'https://elot-bucket.s3.us-east-2.amazonaws.com/horizon-forbidden-west.jfif',
    },
    {
        'title':'Indie Game Success: Hades Wins Big at Awards',
        'body':'''Supergiant Games’ "Hades" has achieved remarkable success at recent gaming awards, celebrating its innovative design and compelling gameplay. The game’s accolades highlight its impact within the gaming community and its exceptional quality.

"Hades" received the prestigious Game of the Year award, recognizing its outstanding contribution to the gaming industry. This award underscores the game’s excellence and its ability to stand out among a competitive field of titles.

In addition to Game of the Year, "Hades" won Best Indie Game, highlighting its success within the indie game community. The game’s unique approach and high-quality execution have resonated with both critics and players.

The game’s narrative and character design were also praised, earning awards for Best Narrative and Best Character Design. "Hades" is celebrated for its engaging story and well-developed characters, adding depth to the overall experience.

The success of "Hades" underscores the growing recognition and influence of indie games in the industry. The game’s achievements reflect its innovation and the impact it has had on players and critics alike.''',
        'ownerId':2,
        'tags':[Tags.switch,Tags.singleplayer],
        'image':'https://elot-bucket.s3.us-east-2.amazonaws.com/hades.jfif',
    },
    {
        'title':'Major Update for Animal Crossing: New Horizons',
        'body':'''
Nintendo has rolled out a major update for "Animal Crossing: New Horizons," introducing a host of new features and improvements that promise to enhance the beloved life simulation game.

The update brings new seasonal events, including a summer festival and winter holiday activities. These additions add variety to the in-game calendar, providing players with fresh content and new experiences throughout the year.

Customization options have been expanded, allowing players to further personalize their islands with new furniture and decor. These new options enhance players’ ability to create unique and vibrant environments on their virtual islands.

The update introduces new activities, such as cooking and fishing competitions, offering players additional ways to engage with the game. These activities provide fresh goals and challenges, adding to the overall enjoyment of the game.

Quality of life improvements, including bug fixes and performance enhancements, aim to improve the overall gameplay experience. These changes address player feedback and ensure a smoother and more enjoyable experience.

Special community events and collaborations with other franchises are also planned, offering exclusive items and experiences for players. These events provide unique rewards and opportunities for players to engage with the game in new ways.

The major update for "Animal Crossing: New Horizons" aims to refresh the game with exciting new content and improvements, keeping it engaging and enjoyable for its dedicated fanbase.''',
        'ownerId':3,
        'tags':[Tags.nintendo, Tags.switch],
        'image':'https://elot-bucket.s3.us-east-2.amazonaws.com/animal_crossing_nh.png',
    }
]


def seed_helper(name, description,ownerId, tags=[], baseImage=''):
    testProduct = Article(
        title= name,
        body = description,
        ownerId = ownerId,
        articleImage = baseImage
    )
    db.session.add(testProduct)
    db.session.commit()

    for tag in tags:
        new_tag = ArticleTag(
            tag=tag,
            articleId=testProduct.id
        )
        db.session.add(new_tag)
    db.session.commit()


# Adds a demo user, you can add other users here if you want
def seed_articles():
    for article in articleArr:
        seed_helper(article['title'], article['body'],article['ownerId'], tags=article['tags'], baseImage=article['image'])


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_articles():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.article_tags RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.articles RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM article_tags"))
        db.session.execute(text("DELETE FROM articles"))

    db.session.commit()
