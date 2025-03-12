import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { useScreenSize } from "./hooks/useScreenSize";
import UsersPage from "./pages/UsersPage"; // Import de la nouvelle page pour gérer les utilisateurs
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import pour la navigation

function App() {
  const screenSize = useScreenSize(); // Détecte la taille d'écran
  const [message, setMessage] = useState("Chargement...");

  // Appelle l'API Flask pour obtenir un message au chargement de la page
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/test")
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => setMessage("Erreur de connexion au backend"));
  }, []);

  return (
    <Router>
      <div className="flex">
        <Navbar screenSize={screenSize} />
        <main className="ml-60 p-10 flex-1">
          <h2 className="text-3xl font-bold text-blue-600">Bienvenue sur StratMind</h2>
          <p className="text-gray-700">Une première version avec une sidebar et un sous-menu.</p>
          <p className="mt-4 text-green-600 font-semibold">Message du backend : {message}</p>

          {/* Gestion des routes */}
          <Routes>
            {/* Route vers la page utilisateurs */}
            <Route path="/users" element={<UsersPage />} />
            {/* Autres routes peuvent être ajoutées ici */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
