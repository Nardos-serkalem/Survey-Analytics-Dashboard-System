from datetime import datetime, timezone
from flask import session
from app import db
from app.model import User

class AuthService:
    @staticmethod
    def login(username, password):
        user = db.session.query(User).filter_by(username=username).first()
        if user and user.check_password(password):
            user.last_login = datetime.now(timezone.utc)
            db.session.commit()
            session['user_id'] = user.user_id
            session['role'] = user.role
            return user
        return None

    @staticmethod
    def logout():
        session.pop('user_id', None)
        session.pop('role', None)

    @staticmethod
    def is_admin():
        return session.get('role') == 'admin'

    @staticmethod
    def is_authenticated():
        return 'user_id' in session
