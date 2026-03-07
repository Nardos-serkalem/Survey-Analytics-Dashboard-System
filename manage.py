#Please Dont run any of this command if you dont know what it does, it will delete the database and all the data in it  :)

import os
import sys
from app import create_app
from app.models import db

def init_db(app):
    """Create all tables, like from scratch"""
    with app.app_context():
        db.create_all()
        print('✓ All tables created.')

def drop_db(app):
    """Drop all tables."""
    with app.app_context():
        db.drop_all()
        print('✓ All tables dropped.')

def reset_db(app):
    """Drop then recreate all tables."""
    drop_db(app)
    init_db(app)

def inspect_db(app):
    """Print the names of every table currenty in the database."""
    from sqlalchemy import inspect as sa_inspect
    with app.app_context():
        inspector = sa_inspect(db.engine)
        tables = inspector.get_table_names()
        if tables:
            print(f'Tables in database ({len(tables)}):')
            for t in sorted(tables):
                print(f'  • {t}')
        else:
            print('No tables found. Run `python manage.py init` first.')

import click

app = create_app(os.environ.get('FLASK_ENV', 'dev'))

@app.cli.command("create-user")
@click.argument("username")
@click.argument("password")
@click.option("--role", default="admin")
def create_user_command(username, password, role):
    """Create a new system user."""
    from app.models import db, User
    
    with app.app_context():
        if User.query.filter_by(username=username).first():
            click.echo(f"Error: User {username} already exists.")
            return

        user = User(username=username, role=role)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        click.echo(f"Success: User {username} created with role {role}.")

if __name__ == '__main__':
    commands = {
        'init':        init_db,
        'drop':        drop_db,
        'reset':       reset_db,
        'inspect':     inspect_db,
        'create-user': lambda app: create_user_command(*(sys.argv[2:] if len(sys.argv) > 2 else []))
    }

    cmd = sys.argv[1] if len(sys.argv) > 1 else 'init'

    if cmd not in commands:
        print(f'Unknown command: {cmd}')
        print(f'Usage: python manage.py [{"|".join(commands)}]')
        sys.exit(1)

    commands[cmd](app)
