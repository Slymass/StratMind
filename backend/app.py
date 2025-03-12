from flask import Flask
from flask_cors import CORS
from api.routes import api_blueprint  # Import des routes

app = Flask(__name__)
CORS(app)  # Active CORS pour que React puisse faire des requêtes

# Enregistre le blueprint (les routes API)
app.register_blueprint(api_blueprint, url_prefix="/api")

if __name__ == "__main__":
    app.run(debug=True)
