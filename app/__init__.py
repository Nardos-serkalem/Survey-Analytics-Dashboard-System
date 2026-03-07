import os
from flask import Flask
from flask_sqlalchemy_lite import SQLAlchemy
from .model import Base
from config import config_by_name

db = SQLAlchemy()

def create_app(env='dev'):
    # do not hard code this parts. please refer to config.py and use env.example to create your own env file
    env = os.environ.get('FLASK_ENV', env)
    
    app = Flask(__name__)
    
    config_obj = config_by_name.get(env, config_by_name['dev'])
    app.config.from_object(config_obj)
    app.config['PROPAGATE_EXCEPTIONS'] = True
    
    db_uri = app.config.get('SQLALCHEMY_DATABASE_URI')
    if not db_uri or db_uri.startswith('sqlite:///'):
        # Consistently use the instance folder for SQLite
        if not db_uri:
            db_uri = 'sqlite:///yne_survey.db'
            
        if ':///' in db_uri:
            db_name = db_uri.split(':///')[1]
            if not os.path.isabs(db_name):
                # Ensure instance folder exists
                if not os.path.exists(app.instance_path):
                    os.makedirs(app.instance_path)
                db_path = os.path.join(app.instance_path, db_name).replace('\\', '/')
                db_uri = f'sqlite:///{db_path}'
        
    app.config['SQLALCHEMY_ENGINES'] = {
        'default': {
            'url': db_uri,
            'echo': app.config.get('SQLALCHEMY_ECHO', False)
        }
    }
    
    db.init_app(app) 
    
    from app.api import api_bp
    app.register_blueprint(api_bp, url_prefix='/api/v1')
    
    return app