from flask import Flask
from flask_sqlalchemy_lite import SQLAlchemy
from .model import Base

db = SQLAlchemy()

def create_app(env='dev'):
    app = Flask(__name__)
    app.config['SQLALCHEMY_ENGINES'] = {'default': 'sqlite:///yne_survey.db'}
    app.config['SQLALCHEMY_DATABASE_URI'] = app.config['SQLALCHEMY_ENGINES']['default']
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app) 
    return app