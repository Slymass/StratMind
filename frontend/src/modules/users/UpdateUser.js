import React, { useState, useEffect } from "react";
import { fetchData, updateData, deleteData } from "../../services/apiServices"; // Import des fonctions API

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

  // Fonction pour récupérer les données d'un utilisateur spécifique
  const fetchUserData = async (userId) => {
    try {
      const user = await fetchData(`/users/${userId}`);
      setUsername(user.username);
      setEmail(user.email);
    } catch (error) {
      setMessage("Erreur lors du chargement des données utilisateur.");
    }
  };

  // Récupère les données lorsque l'utilisateur sélectionné change
  useEffect(() => {
    if (selectedUserId) {
      fetchUserData(selectedUserId);
    }
  }, [selectedUserId]); // Suppression de `fetchUserData` dans les dépendances

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    try {
      const userData = { username, email };
      await updateData(`/users/${selectedUserId}`, userData); // Appeler la fonction de mise à jour
      setMessage(`Utilisateur mis à jour`);
    } catch (error) {
      setMessage("Erreur lors de la mise à jour de l'utilisateur.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteData(`/users/${selectedUserId}`);
      setMessage("Utilisateur supprimé avec succès.");
      setSelectedUserId(null); // Réinitialiser après suppression
    } catch (error) {
      setMessage("Erreur lors de la suppression de l'utilisateur.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h3 className="text-xl font-semibold text-blue-600 mb-4">Mettre à jour ou supprimer un utilisateur</h3>
      
      {/* Sélecteur pour choisir un utilisateur */}
      <div className="mb-4">
        <select
          className="px-4 py-2 border rounded-lg w-full"
          onChange={(e) => setSelectedUserId(e.target.value)}
          value={selectedUserId || ""}
        >
          <option value="">Sélectionner un utilisateur</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username} - {user.email}
            </option>
          ))}
        </select>
      </div>

      {/* Affichage du formulaire uniquement si un utilisateur est sélectionné */}
      {selectedUserId && (
        <form onSubmit={handleUpdateSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="px-4 py-2 border rounded-lg w-full"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-2 border rounded-lg w-full"
          />
          <div className="space-x-4">
            <button
              type="submit"
              className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition"
            >
              Mettre à jour
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400 transition"
            >
              Supprimer
            </button>
          </div>
        </form>
      )}

      {message && <p className="mt-4 text-gray-600">{message}</p>}
    </div>
  );
}

export default UpdateUser;
