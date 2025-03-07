import React from "react";
import Sidebar from "./navbar/Sidebar";
import ModulesMenu from "./navbar/ModulesMenu";

function Navbar() {
  return (
    <Sidebar>
      <ModulesMenu />
    </Sidebar>
  );
}

export default Navbar;
