import { useState, useEffect } from "react";

function getScreenSize() {
  if (window.innerWidth < 640) return "mobile";  // Moins de 640px → Mobile
  if (window.innerWidth < 1024) return "tablet"; // Entre 640px et 1024px → Tablette
  return "desktop"; // Plus grand que 1024px → Desktop
}

export function useScreenSize() {
  const [screenSize, setScreenSize] = useState(getScreenSize());

  useEffect(() => {
    function handleResize() {
      setScreenSize(getScreenSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
}
