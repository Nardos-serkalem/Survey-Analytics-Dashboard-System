from flask import request, session
from flask_restful import Resource
from app.services.auth_service import AuthService

class Login(Resource):
    def post(self):
        try:
            data = request.get_json()
            if not data or 'username' not in data or 'password' not in data:
                return {'message': 'Missing username or password'}, 400
            
            user = AuthService.login(data['username'], data['password'])
            if user:
                return {
                    'message': f'Welcome {user.username}',
                    'role': user.role,
                    'status': 'success'
                }, 200
            
            return {'message': 'Invalid credentials'}, 401
        except Exception as e:
            import traceback
            traceback.print_exc()
            return {'message': f'Internal Server Error: {str(e)}'}, 500

class Logout(Resource):
    def post(self):
        AuthService.logout()
        return {'message': 'Logged out successfully'}, 200

class AuthStatus(Resource):
    def get(self):
        if AuthService.is_authenticated():
            return {
                'authenticated': True,
                'role': session.get('role'),
                'is_admin': AuthService.is_admin()
            }
        return {'authenticated': False}, 200
