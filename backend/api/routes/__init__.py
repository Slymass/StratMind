from flask import Blueprint
from .users_routes import users_routes  # Import correct depuis `routes/`

api_blueprint = Blueprint("api", __name__)

api_blueprint.register_blueprint(users_routes)
