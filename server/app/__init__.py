# from flask import Flask
from flask_sqlalchemy import SQLAlchemy
# from flask_jwt_extended import JWTManager
# from flask_cors import CORS

db = SQLAlchemy()
# jwt = JWTManager()

from .user import User
from .leaveRequest import LeaveRequest

__all__=[
    'db'
    'user'
    'LeaveRequest'
]
