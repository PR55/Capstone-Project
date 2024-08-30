from flask_wtf import FlaskForm
from wtforms import SubmitField, StringField, IntegerField
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
    comment = StringField('Comment', validators=[DataRequired()])
    rating = IntegerField('Rating', validators=[DataRequired()])
