// src/modules/users/DeleteUser.js
import React, { useState } from "react";
import { deleteData } from "../../services/apiServices"; // Import de la fonction de suppression

function DeleteUser({ userId }) {
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    try {
      await deleteData(`/users/${userId}`); // Utilisation de la fonction deleteData pour supprimer l'utilisateur
      setMessage("Utilisateur supprimé");
    } catch (error) {
      setMessage("Erreur lors de la suppression de l'utilisateur.");
    }
  };

  return (
    <div>
      <h3>Supprimer l'utilisateur</h3>
      <button onClick={handleDelete}>Supprimer</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default DeleteUser;
