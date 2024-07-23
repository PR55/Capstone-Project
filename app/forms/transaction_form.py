from flask_wtf import FlaskForm
from wtforms import StringField, FieldList, Form, IntegerField, FormField
from wtforms.validators import DataRequired

class FormDataHolder(FlaskForm):
    id = StringField('id', validators=[DataRequired()])

class TransactionForm(FlaskForm):
    products = FieldList(IntegerField('id', validators=[DataRequired()]), min_entries=1)
