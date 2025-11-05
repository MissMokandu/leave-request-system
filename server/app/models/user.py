from app.extensions import db
from datetime import datetime

class User(db.Model):
    __tablename__='users'

    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String, nullable=False)
    email=db.Column(db.String, unique=True, nullable= False)
    password=db.Column(db.String, nullable=False)
    role=db.Column(db.String, default='employee')

    leaves = db.relationship('LeaveRequest', backref='user')

