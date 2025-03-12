import React, { useState } from "react";
import { Link } from "react-router-dom";  // On importe Link pour la navigation

function ModulesMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Bouton Modules */}
      <button
        className="w-full text-left bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded transition"
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
