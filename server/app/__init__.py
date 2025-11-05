from flask import Flask
from .extensions import db, jwt, cors, migrate
from .models import User, LeaveRequest

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///leave-request-system.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'replace_with_your_secret_key'
    app.config['JWT_SECRET_KEY'] = 'replace_with_your_jwt_secret_key'

    db.init_app(app)
    jwt.init_app(app)
    cors.init_app(app)
    migrate.init_app(app, db)

    from app.routes.auth_routes import auth_bp
    from app.routes.leave_routes import leave_bp


    app.register_blueprint(auth_bp)
    app.register_blueprint(leave_bp)  

    return app
