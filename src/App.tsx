import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Outside from "./pages/Outside";
import MonthlySpendings from "./pages/MonthlySpendings";
import Transactions from "./pages/Transactions";
import Charts from "./pages/Charts";
import GroupManagement from "./pages/GroupManagement";
import AddSpending from "./pages/AddSpending";
import TestPage from "./pages/TestPage";

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
      <Route path="/spendings" element={<MonthlySpendings />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/charts" element={<Charts />} />
      <Route path="/group-management" element={<GroupManagement />} />
      <Route path="/add-spending" element={<AddSpending />} />
      <Route path="/test" element={<TestPage />} />
    </Routes>
  );
}

export default App;
