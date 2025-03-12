import React, { useEffect, useState } from "react";
import { fetchData } from "../../services/apiServices"; // Utilisation de la fonction générique

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  // Appel à l'API pour récupérer les utilisateurs
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await fetchData("/users"); // Nous récupérons la liste des utilisateurs depuis /users
        setUsers(data); // Met à jour l'état avec les utilisateurs récupérés
      } catch (error) {
        setError("Erreur lors du chargement des utilisateurs.");
      }
    };

    fetchUsers();
  }, []);

  // Si une erreur se produit, afficher le message d'erreur
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h3 className="text-2xl font-semibold">Liste des utilisateurs</h3>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>
              {user.username} - {user.email}
            </li>
          ))
        ) : (
          <p>Aucun utilisateur trouvé.</p>
        )}
      </ul>
    </div>
  );
};

export default UsersList;
