from flask import Flask
from config import Config
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
# from extentions import db, jwt 
# from routes.auth_routes import auth_bp
# from routes.leave_routes import leave_bp

db = SQLAlchemy()
jwt = JWTManager()


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)
    db.init_app(app)
    jwt.init_app(app)

    # app.register_blueprint(auth_bp, url_prefix = '/auth')
    # app.register_blueprint(leave_bp, url_prefix = '/leave')

    @app.route ('/')
    def home():
        return "Leave request system"
    
    return app

if __name__ == "__main__":
    app = create_app()
    app.run ()