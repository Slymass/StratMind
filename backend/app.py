import sys
import os
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

from flask import Flask
from flask_cors import CORS
from api.routes.__init__ import api_blueprint
from config import DATABASE_URL  # Import de la config DB
from models import db  # Import dynamique de tous les modèles via `models/__init__.py`
from api.routes.users_routes import users_routes

app = Flask(__name__)
CORS(app)  # Active CORS pour que React puisse faire des requêtes

# Configuration de la base de données
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)  # Attache `db` à `app`

# Enregistre le blueprint (les routes API)
app.register_blueprint(users_routes, url_prefix="/api")

if __name__ == "__main__":
    with app.app_context():
        db.create_all()  # Assure que les tables existent dans la DB
    app.run(debug=True)
