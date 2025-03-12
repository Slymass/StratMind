// src/modules/users/DeleteUser.js
import React, { useState } from "react";
import { fetchData } from "../../services/apiServices"; // Utilisation de la fonction générique

function DeleteUser({ userId }) {
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    try {
      await deleteUser(userId); // Appeler la fonction de suppression
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
