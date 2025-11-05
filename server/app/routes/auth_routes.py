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

@auth_bp.route('/login', methods=['POST'])
def login():
    data=request.get_json()
    name=data.get('name')
    password=data.get('password')

    if not name or not password:
        return jsonify ({'error': 'Ensure all fields are filled'}), 400

    user = User.query.filter_by(name=name). first()

    if not user or not user.check_password(password):
        return jsonify ({'error': 'Invalid credentials'}), 401


    access_token = create_access_token(identity={'id': user.id, 'role': user.role})
    return jsonify({'access_token': access_token})