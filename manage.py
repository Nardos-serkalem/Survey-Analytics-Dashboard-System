#Please Dont run any of this command if you dont know what it does, it will delete the database and all the data in it  :)

import os
import sys
from app import create_app, db
from app.model import Base

def init_db(app):
    """Create all tables, like from scratch"""
    with app.app_context():
        Base.metadata.create_all(db.engine)
        print('✓ All tables created.')

def drop_db(app):
    """Drop all tables."""
    with app.app_context():
        Base.metadata.drop_all(db.engine)
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

def manual_create_user(username, password, role='admin'):
    from app.model import User
    with app.app_context():
        if db.session.query(User).filter_by(username=username).first():
            print(f"Error: User {username} already exists.")
            return
        user = User(username=username, role=role)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        print(f"Success: User {username} created with role {role}.")

import click

app = create_app(os.environ.get('FLASK_ENV', 'dev'))

@app.cli.command("create-user")
@click.argument("username")
@click.argument("password")
@click.option("--role", default="admin")
def create_user_command(username, password, role):
    """Create a new system user via Flask CLI."""
    manual_create_user(username, password, role)

if __name__ == '__main__':
    commands = {
        'init':        init_db,
        'drop':        drop_db,
        'reset':       reset_db,
        'inspect':     inspect_db,
    }

    if len(sys.argv) < 2:
        print(f'Usage: python manage.py [{"|".join(commands.keys())} | create-user]')
        sys.exit(1)

    cmd = sys.argv[1]

    if cmd == 'create-user':
        args = sys.argv[2:]
        if len(args) < 2:
            print("Usage: python manage.py create-user <username> <password> [--role <role>]")
            sys.exit(1)
        username = args[0]
        password = args[1]
        role = 'admin'
        if '--role' in args:
            idx = args.index('--role')
            if len(args) > idx + 1:
                role = args[idx+1]
        manual_create_user(username, password, role)
        sys.exit(0)

    if cmd not in commands:
        print(f'Unknown command: {cmd}')
        print(f'Usage: python manage.py [{"|".join(commands.keys())} | create-user]')
        sys.exit(1)

    commands[cmd](app)
