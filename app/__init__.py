from flask import Flask
from config import config_by_name
from app.models import db

def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])
    
    db.init_app(app)
    
    from app.api import api_bp
    app.register_blueprint(api_bp, url_prefix='/api/v1')
    
    return app
