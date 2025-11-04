from flask import Flask
from flask_cors import CORS
from extentions import db, jwt 
from config import Config
from routes.auth_routes import auth_bp
from routes.leave_routes import leave_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)
    db.init_app(app)
    jwt.init_app(app)

    app.register_blueprint(auth_bp, url_prefix = '/auth')
    app.register_blueprint(leave_bp, url_prefix = '/auth')

    @app.route ('/')
    def home():
        return {}
    
    return app

if __name__== "main":
    app = create_app
    app.run (debugs = True)