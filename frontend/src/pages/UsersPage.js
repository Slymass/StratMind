import React, { useState } from "react";
import UsersList from "../modules/users/GetUsers";  // Affichage de la liste des utilisateurs
import CreateUser from "../modules/users/CreateUser";  // Formulaire pour créer un utilisateur
import UpdateUser from "../modules/users/UpdateUser";  // Formulaire pour mettre à jour un utilisateur
import DeleteUser from "../modules/users/DeleteUser";  // Formulaire pour supprimer un utilisateur

const UsersPage = () => {
  const [view, setView] = useState("list");  // Gère l'affichage entre "list", "create", et "update"

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-semibold text-center text-blue-600 mb-6">Module Utilisateurs</h1>

      {/* Section pour les boutons de navigation */}
      <div className="flex justify-center mb-6 space-x-4">
        <button
          onClick={() => setView("list")}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition"
        >
          Voir Liste des Utilisateurs
        </button>
        <button
          onClick={() => setView("create")}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400 transition"
        >
          Ajouter un Utilisateur
        </button>
        <button
          onClick={() => setView("update")}
          className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition"
        >
          Mettre à jour un Utilisateur
        </button>
      </div>

      {/* Section affichage basé sur l'état de "view" */}
      <div className="p-4 border rounded-lg shadow-lg">
        {view === "list" && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-700">Liste des utilisateurs</h2>
            <UsersList />
          </div>
        )}

        {view === "create" && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-700">Ajouter un utilisateur</h2>
            <CreateUser />
          </div>
        )}

        {view === "update" && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-700">Mettre à jour un utilisateur</h2>
            <UpdateUser />
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
