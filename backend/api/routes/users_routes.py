from flask import Blueprint, request, jsonify
from models.users import User
from models import db

users_routes = Blueprint("users", __name__)

# Récupérer tous les utilisateurs
@users_routes.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify([{"id": user.id, "username": user.username, "email": user.email} for user in users])

# Récupérer un utilisateur par ID
@users_routes.route("/users/<int:user_id>", methods=["GET"])
def get_user(user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify({"id": user.id, "username": user.username, "email": user.email})
    return jsonify({"error": "Utilisateur non trouvé"}), 404

# Créer un nouvel utilisateur
@users_routes.route("/users", methods=["POST"])
def create_user():
    data = request.json
    if not data.get("username") or not data.get("email"):
        return jsonify({"error": "Champs manquants"}), 400

    new_user = User(username=data["username"], email=data["email"])
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "message": "Utilisateur créé",
        "user": {"id": new_user.id, "username": new_user.username, "email": new_user.email}
    }), 201

# Mettre à jour un utilisateur
@users_routes.route("/users/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "Utilisateur non trouvé"}), 404

    data = request.json
    user.username = data.get("username", user.username)
    user.email = data.get("email", user.email)

    db.session.commit()

    return jsonify({
        "message": "Utilisateur mis à jour",
        "user": {"id": user.id, "username": user.username, "email": user.email}
    })

# Supprimer un utilisateur
@users_routes.route("/users/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "Utilisateur non trouvé"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "Utilisateur supprimé"}), 200
