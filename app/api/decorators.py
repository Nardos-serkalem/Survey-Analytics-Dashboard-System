from functools import wraps
from flask import session
from flask_restful import abort

def admin_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if 'user_id' not in session:
            abort(401, message="Authentication required")
        if session.get('role') != 'admin':
            abort(403, message="Admin privileges required")
        return f(*args, **kwargs)
    return decorated

def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if 'user_id' not in session:
            abort(401, message="Authentication required")
        return f(*args, **kwargs)
    return decorated
