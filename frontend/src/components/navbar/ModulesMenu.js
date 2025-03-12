import React, { useState } from "react";
import { Link } from "react-router-dom";  // On importe Link pour la navigation

function ModulesMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Nouveau lien avec une marge en bas */}
      <div className="mt-2 space-y-2 mb-4">
      <Link
        to="/Accueil"
        className="w-full text-left bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded transition mb-4"
      >
        Accueil
      </Link>
      </div>

      {/* Bouton Modules */}
      <button
        className="w-full text-left bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded transition mb-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        Modules
      </button>

      {/* Sous-menu */}
      {isOpen && (
        <div className="mt-2 space-y-2">
          <Link to="/users" className="block w-full text-left bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded transition">
            Utilisateurs
          </Link>
          <button className="block w-full text-left bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded transition">
            Module 2
          </button>
          <button className="block w-full text-left bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded transition">
            Module 3
          </button>
          <button className="block w-full text-left bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded transition">
            Module 4
          </button>
        </div>
      )}
    </div>
  );
}

export default ModulesMenu;
