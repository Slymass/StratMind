import React from "react";
import Sidebar from "./navbar/Sidebar";
import ModulesMenu from "./navbar/ModulesMenu";

function Navbar({ screenSize }) {  // Récupère la taille d'écran envoyée par App.js
  return (
    <Sidebar>
      {screenSize === "mobile" ? (
        <p className="text-sm text-gray-400">Mode mobile</p>
      ) : (
        <ModulesMenu />
      )}
    </Sidebar>
  );
}

export default Navbar;
