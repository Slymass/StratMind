import React from "react";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="flex">
      <Navbar />
      <main className="ml-60 p-10 flex-1">
        <h2 className="text-3xl font-bold text-blue-600">Bienvenue sur StratMind</h2>
        <p className="text-gray-700">Une première version avec une sidebar et un sous-menu.</p>
      </main>
    </div>
  );
}

export default App;
