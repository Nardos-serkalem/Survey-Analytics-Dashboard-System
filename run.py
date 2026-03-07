import os
from app import create_app, db
from app.model import Base
from app.seed.seeder import seed_data

env = os.environ.get('FLASK_ENV', 'dev')
app = create_app(env)

if __name__ == '__main__':
    with app.app_context():
        Base.metadata.create_all(db.engine)
        seed_data()
    app.run(port=5001)
