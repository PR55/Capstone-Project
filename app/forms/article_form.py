from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField, StringField, FloatField, BooleanField, SelectMultipleField
from app.api.aws_helpers import ALLOWED_EXTENSIONS
from wtforms.validators import DataRequired
from app.models import Tags

class ArticleForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired()])
    body = StringField("Body", validators=[DataRequired()])
    tags = SelectMultipleField("Tags", choices=[x.value for x in Tags],validators=[DataRequired()])
    image = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Create Post")
