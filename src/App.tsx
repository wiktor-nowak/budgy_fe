import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Outside from "./pages/Outside";

async function loadPreline() {
  return import("preline/dist/index.js");
}

function App() {
  const location = useLocation();

  useEffect(() => {
    const initPreline = async () => {
      await loadPreline();

      if (
        window.HSStaticMethods &&
        typeof window.HSStaticMethods.autoInit === "function"
      ) {
        window.HSStaticMethods.autoInit();
      }
    };

    initPreline();
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Outside />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
