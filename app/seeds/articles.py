from app.models import (
    db,Article, ArticleTag, Tags,
    environment, SCHEMA
    )
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_articles():
    b = 'Ei ius scaevola principes repudiare, duo an partem nominavi maluisset. Cu nam mucius corrumpit efficiendi. Id agam nostrud electram quo. In mea nonumy eloquentiam. Suscipit delicata iracundia mea an, facer gloriatur referrentur sea et. In his velit aeque quaeque. Qui id stet soleat, in simul populo fastidii his.Ea sumo utroque legendos pri. Et dicant moderatius disputationi vim. Pri lorem iuvaret et, ne eligendi mandamus vis. Nam agam movet delicatissimi an.Eu vix dico atqui, te vis solum sonet iracundia. Eu vim quod voluptatibus. In sit tale liber phaedrum, no nam movet maiorum denique. Nobis verear nominati ei mea. Ad vix eros labitur perfecto, voluptua consequuntur per ei. Semper mollis omnesque nec ex. Verear timeam constituto nam no.Vitae dicam id mei, ea veniam nostrum vix. At elit simul vel, et velit feugiat nonumes sit. At pri omnesque platonem persecuti, ex nec sale altera delectus. Laudem interesset vel cu, et nec inermis consequuntur, enim tincidunt vim in. Ut ignota meliore sea, ne vix timeam delenit, ei virtute nominavi scribentur vim. Rebum invidunt similique pro ne, qui id recusabo instructior, pri omnis mazim no.Et usu odio nominavi. Mazim audire aperiri per no, ex sed meis simul doming. Ei his prompta detracto indoctum. Has eros voluptua deterruisset an, wisi efficiendi ad sed. Te sea laudem integre splendide, pro cibo iuvaret at. Eu nam inani dissentias cotidieque, omnium eripuit efficiantur ex his.Mea ei nobis impetus, at nobis patrioque tincidunt usu. Feugiat graecis per ei, ei tota laudem ornatus eam, cu habemus euripidis definitionem vel. Habeo diceret dissentiunt eu sit. Aliquando prodesset mei te.Ut sit meis aliquid posidonium, malis percipit ei usu. No malis consetetur vis, vim an lucilius accusamus. Ei rebum dicta nominavi mea. Commune lucilius cu vis, sit et viris ponderum appellantur. Vocent suscipit ad nec.Paulo zril praesent mei an, usu porro doctus ad. Odio voluptua et vim. Omittam delectus patrioque usu at, volumus vivendum in vix. Postea apeirian est ea. Nullam noster eam et, pri te purto impetus sensibus, mea ne nulla volutpat. Prima aperiri ponderum usu no.Libris hendrerit eum te, doctus molestiae mnesarchum te his. Te elit viderer ius, no eos dicta deserunt. Ei per possim qualisque patrioque, partem feugiat elaboraret ne his. Ipsum voluptaria pri id. Et liber necessitatibus nam, an nec modus virtute, prima sententiae nec ut. Oratio viderer theophrastus eam te, dico alterum lobortis ad mel, vix ad dicat sensibus explicari.Et nam nullam vivendum, alii feugiat patrioque mei in. Id mundi nonumy everti nec, ne eum expetendis moderatius. Eu autem viderer signiferumque vel, propriae explicari et eos. Cu duo ipsum invenire molestiae.Cu duo noluisse suscipiantur, elit habemus mea ne. Usu oratio menandri no, mei quaeque eruditi te. Quando vituperatoribus cu pri, possit persequeris ne nec. Mutat ocurreret his at, in usu ignota verear.Decore utinam ei quo, cu rebum nonumes per. Mollis tritani mea ne, magna graeci nusquam eum eu. In alii putant invenire duo, affert vocent pri ex, eius sale conceptam et ius. An utinam molestie eloquentiam vis. Sed alii postulant complectitur an.'

    testArticle = Article(
        title = 'Lorem Ipsum Test',
        body = b,
        ownerId = 1,
        articleImage = 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1623730/capsule_616x353.jpg?t=1719480904'
    )

    testTag1 = ArticleTag(
        tag = Tags.switch,
        articleId = 1
    )

    db.session.add(testArticle)
    db.session.add(testTag1)
    db.session.commit()


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
