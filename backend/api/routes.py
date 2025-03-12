from flask import Blueprint
from api.routes.users_routes import users_routes  # Vérifie bien ce chemin

api_blueprint = Blueprint("api", __name__)

# Enregistre toutes les routes sous le blueprint principal
api_blueprint.register_blueprint(users_routes)
