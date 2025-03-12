from flask import Blueprint, jsonify
from api.users_routes import users_routes  # Assure-toi que l'import correspond au bon chemin

api_blueprint = Blueprint("api", __name__)

# Enregistre les routes utilisateurs sous le préfixe `/api/users`
api_blueprint.register_blueprint(users_routes, url_prefix="/users")

# Route de test pour vérifier que l'API fonctionne
@api_blueprint.route("/test", methods=["GET"])
def test_route():
    return jsonify({"message": "Le backend Flask fonctionne !"})
