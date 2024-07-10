from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField, StringField, FloatField, BooleanField, SelectMultipleField
from app.api.aws_helpers import ALLOWED_EXTENSIONS
from wtforms.validators import DataRequired
from app.models import Tags
class ProductForm(FlaskForm):
    name = StringField("Product Name", validators=[DataRequired()])
    description = StringField("Description", validators=[DataRequired()])
    price = FloatField("Price", validators=[DataRequired()])
    tags = SelectMultipleField("Tags", choices=[x.value for x in Tags],validators=[DataRequired()])
    isTraditional = BooleanField("Traditional Product")
    image = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Create Post")
