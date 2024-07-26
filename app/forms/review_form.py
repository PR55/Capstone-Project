from flask_wtf import FlaskForm
from wtforms import SubmitField, StringField, IntegerField
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    review = StringField('Review', validators=[DataRequired()])
    rating = IntegerField('Rating', validators=[DataRequired()], min=1, max=5)
