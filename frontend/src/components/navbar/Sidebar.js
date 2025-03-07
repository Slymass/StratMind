import React from "react";

function Sidebar({ children }) {
  return (
    <div className="h-screen w-60 bg-gray-900 text-white fixed top-0 left-0 p-5 flex flex-col">
      <h1 className="text-2xl font-bold mb-6">StratMind</h1>
      {children} {/* On injecte ici les autres éléments */}
    </div>
  );
}

export default Sidebar;
