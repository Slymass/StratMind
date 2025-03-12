import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { useScreenSize } from "./hooks/useScreenSize";

function App() {
  const screenSize = useScreenSize(); // Détecte la taille d'écran
  const [message, setMessage] = useState("Chargement...");

  // Appelle l'API Flask au chargement de la page
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/test")
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => setMessage("Erreur de connexion au backend"));
  }, []);

  return (
    <div className="flex">
      <Navbar screenSize={screenSize} />
      <main className="ml-60 p-10 flex-1">
        <h2 className="text-3xl font-bold text-blue-600">Bienvenue sur StratMind</h2>
        <p className="text-gray-700">Une première version avec une sidebar et un sous-menu.</p>
        <p className="mt-4 text-green-600 font-semibold">Message du backend : {message}</p>
      </main>
    </div>
  );
}

export default App;
