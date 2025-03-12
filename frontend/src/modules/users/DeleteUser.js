// src/modules/users/DeleteUser.js
import React, { useState } from "react";
import { deleteData } from "../../services/apiServices"; // Import de la fonction de suppression

function DeleteUser({ userId, onDelete }) {
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    try {
      await deleteData(`/users/${userId}`);
      setMessage("Utilisateur supprimé");
      if (onDelete) onDelete(userId); // Appelle une fonction de rappel pour mettre à jour la liste
    } catch (error) {
      setMessage("Erreur lors de la suppression de l'utilisateur.");
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleDelete}
        className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400 transition"
      >
        Supprimer
      </button>
      {message && <p className="mt-2 text-gray-600">{message}</p>}
    </div>
  );
}

export default DeleteUser;
