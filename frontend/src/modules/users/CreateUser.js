// src/modules/users/CreateUser.js
import React, { useState } from "react";
import { postData } from "../../services/apiServices"; // Utilisation de la fonction générique

function CreateUser() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userData = { username, email };
      const response = await postData("/users", userData); // Appelle postData pour envoyer les données
      setMessage(`Utilisateur créé : ${response.user.username}`);
    } catch (error) {
      setMessage("Erreur lors de la création de l'utilisateur.");
    }
  };
  
  return (
    <div>
      <h3>Créer un utilisateur</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Créer</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateUser;
