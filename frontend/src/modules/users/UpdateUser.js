// src/modules/users/UpdateUser.js
import React, { useState, useEffect } from "react";
import { fetchData, updateData } from "../../services/apiServices"; // Ajout de fetchData ici

function UpdateUser() {
  const [users, setUsers] = useState([]); // Liste des utilisateurs
  const [selectedUserId, setSelectedUserId] = useState(null); // ID de l'utilisateur sélectionné
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Récupère tous les utilisateurs au chargement du composant
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await fetchData("/users");
        setUsers(data); // Met à jour la liste des utilisateurs
      } catch (error) {
        setMessage("Erreur lors du chargement des utilisateurs.");
      }
    };

    fetchUsers();
  }, []);

  // Récupère les données de l'utilisateur sélectionné
  useEffect(() => {
    if (selectedUserId) {
      const fetchUserData = async () => {
        try {
          const user = await fetchData(`/users/${selectedUserId}`);
          setUsername(user.username);
          setEmail(user.email);
        } catch (error) {
          setMessage("Erreur lors du chargement des données utilisateur.");
        }
      };

      fetchUserData();
    }
  }, [selectedUserId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userData = { username, email };
      const response = await updateData(`/users/${selectedUserId}`, userData); // Appeler la fonction de mise à jour
      setMessage(`Utilisateur mis à jour`);
    } catch (error) {
      setMessage("Erreur lors de la mise à jour de l'utilisateur.");
    }
  };

  return (
    <div>
      <h3>Mettre à jour l'utilisateur</h3>
      
      {/* Sélecteur pour choisir un utilisateur */}
      <select
        onChange={(e) => setSelectedUserId(e.target.value)}
        value={selectedUserId || ""}
      >
        <option value="">Sélectionner un utilisateur</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.username}
          </option>
        ))}
      </select>

      {/* Affichage du formulaire uniquement si un utilisateur est sélectionné */}
      {selectedUserId && (
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
          <button type="submit">Mettre à jour</button>
        </form>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}

export default UpdateUser;
