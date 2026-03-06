"""
db.py
─────
DNA Software Team — Survey System
DB & Schema Design Layer

Handles:
  • Flask app factory with DB config
  • db.create_all()  — creates every table defined in models.py
  • db.drop_all()    — teardown helper for development / testing
  • A minimal CLI:
        python db.py init     → create all tables
        python db.py drop     → drop all tables
        python db.py reset    → drop then recreate
        python db.py inspect  → print all table names in the DB
"""

import os
import sys
from flask import Flask
from models import db


def create_app(config: dict | None = None) -> Flask:
    """
    Minimal Flask app factory — only what the schema layer needs.
    The seeding team and analytics team will import this to get
    a configured app context.
    """
    app = Flask(__name__)

    # Core config — override via environment variables or pass config dict
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-change-in-prod')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
        'DATABASE_URL',
        'sqlite:///dna_survey.db',           # dev default; set DATABASE_URL for MySQL
    )
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_ECHO'] = (
        os.environ.get('SQL_ECHO', 'false').lower() == 'true'
    )

    if config:
        app.config.update(config)

    db.init_app(app)
    return app


def init_db(app: Flask) -> None:
    """Create all tables. Safe to call multiple times (IF NOT EXISTS)."""
    with app.app_context():
        db.create_all()
        print('✓ All tables created.')


def drop_db(app: Flask) -> None:
    """Drop all tables. Destructive — development / test use only."""
    with app.app_context():
        db.drop_all()
        print('✓ All tables dropped.')


def reset_db(app: Flask) -> None:
    """Drop then recreate all tables."""
    drop_db(app)
    init_db(app)


def inspect_db(app: Flask) -> None:
    """Print the names of every table currently in the database."""
    from sqlalchemy import inspect as sa_inspect
    with app.app_context():
        inspector = sa_inspect(db.engine)
        tables = inspector.get_table_names()
        if tables:
            print(f'Tables in database ({len(tables)}):')
            for t in sorted(tables):
                print(f'  • {t}')
        else:
            print('No tables found. Run `python db.py init` first.')


# ── CLI ───────────────────────────────────────────────────────────────────────

if __name__ == '__main__':
    commands = {
        'init':    init_db,
        'drop':    drop_db,
        'reset':   reset_db,
        'inspect': inspect_db,
    }

    cmd = sys.argv[1] if len(sys.argv) > 1 else 'init'

    if cmd not in commands:
        print(f'Unknown command: {cmd}')
        print(f'Usage: python db.py [{"|".join(commands)}]')
        sys.exit(1)

    application = create_app()
    commands[cmd](application)
