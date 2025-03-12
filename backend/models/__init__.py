import os
import importlib
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()  # Initialise SQLAlchemy, il sera attaché à `app` plus tard

# Importe dynamiquement tous les fichiers Python du dossier `models` sauf `__init__.py`
modules = [
    f[:-3] for f in os.listdir(os.path.dirname(__file__)) 
    if f.endswith(".py") and f != "__init__.py"
]

# Importe chaque modèle dynamiquement
for module in modules:
    importlib.import_module(f"models.{module}")
