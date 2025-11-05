from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models.user import User
from flask_jwt_extended import create_access_token
import uuid

auth_bp = Blueprint ('auth', __name__, url_prefix='/auth')

@auth_bp.route('/register', methods=['POST'])
def register():
    data=request.get_json()
    name=data.get('name')
    email=data.get('email')
    password=data.get('password')
    role=data.get('role','employee')

    if not name or not email or not password:
        return jsonify ({'error': 'Required field missing'}), 400

    if User.query.filter_by (email=email). first():
        return jsonify ({'error': 'Email already exists'}), 400

    new_user = User(
        name=name,
        email=email,
        role=role
    )
    new_user.set_password(password)  
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({'message': 'You have registered successfully'})