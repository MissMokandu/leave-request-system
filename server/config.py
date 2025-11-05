from dotenv import load_dotenv
import os

load_dotenv()

class Config: 
    DEBUG=os.getenv("DEBUG", "FALSE").lower()=="true"
    FLASK_APP=os.getenv("FLASK_APP")
    FLASK_ENV=os.getenv("FLASK_ENV")
    SECRET_KEY=os.getenv("SECRET_KEY")
    JWT_SECRET_KEY=os.getenv("JWT_SECRET_KEY")
    SQLALCHEMY_DATABASE_URI=os.getenv("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False