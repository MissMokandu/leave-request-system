from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models.user import User
from app.models.leave_request import LeaveRequest
from flask_jwt_extended import create_access_token
from datetime import datetime


leave_bp = Blueprint ('leave', __name__, url_prefix='/leaves')

@leave_bp.route('', methods=['POST'])
@jwt_required()
def submit_leave():
    current_user = get_jwt_identity()
    user_id = current_user['id']

    data=request.get_json()
    leave_type = data.get('leave_type', 'annual')
    start_date = data.get('start_date')
    end_date = data.get('end_date')
    reason = data.get('reason')

    if not start_date or not end_date:
        return jsonify ({'error': 'start date and end dates are required'}), 400

    new_leave = LeaveRequest(
        user_is=user_id,
        leave_type=leave_type,
        start_date=datetime.strptime(start_date, '%Y-%m-%d'),
        end_date=datetime.strptime(end_date, '%Y-%m-%d'), 
        reason=reason
    )
 
    db.session.add(new_leave)
    db.session.commit()

    return jsonify({'message': 'You have submitted your leave application successfully'})

@leave_bp.route('', methods=['GET'])
@jwt_required()
def view_leave():
    current_user = get_jwt_identity()
    user_id = current_user['id']
    role = current_user['role']

   if role == 'admin':
    leaves =LeaveRequest.query.all()

   else:
    leaves = LeaveRequest.query.filter_by(user_id=user_id).all()

   result = []
    for leave in leaves:
        result.append({
            'id': leave.id,
            'user_id': leave.user_id,
            'leave_type': leave.leave_type,
            'start_date': leave.start_date.strftime('%Y-%m-%d'),
            'end_date': leave.end_date.strftime('%Y-%m-%d'),
            'reason': leave.reason,
            'status': leave.status
        })


    return jsonify({result}),200

@leave_bp.route('/<int:leave_id>/status', methods=['PATCH'])
@jwt_required()
def update_leave_status(leave_id):
    current_user = get_jwt_identity()
    role = current_user['role']

    if role != 'admin':
        return jsonify({'error': 'Only admin can update leave status'}), 403

    data = request.get_json()
    status = data.get('status')

    if status not in ['pending', 'approved', 'rejected']:
        return jsonify({'error': 'Invalid status'}), 400

    leave = LeaveRequest.query.get_or_404(leave_id)
    leave.status = status
    db.session.commit()

    return jsonify({'message': f'Leave status updated to {status}'}), 200
