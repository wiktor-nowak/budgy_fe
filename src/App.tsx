import { useEffect } from "react";
import { Routes, Route, useLocation, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Outside from "./pages/Outside";
import MonthlySpendings from "./pages/MonthlySpendings";
import Transactions from "./pages/Transactions";
import Charts from "./pages/Charts";
import GroupManagement from "./pages/GroupManagement";
import AddSpending from "./pages/AddSpending";
import TestPage from "./pages/TestPage";
import Header from "./components/main/Header";
import SideBar from "./components/main/SideBar";
import Footer from "./components/main/Footer";

async function loadPreline() {
  return import("preline/dist/index.js");
}

const AppLayout = () => (
  <div className="flex h-screen bg-bg">
    <SideBar />
    <div className="flex flex-col flex-1 ml-48">
      <Header />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  </div>
);

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
      <Route element={<AppLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/spendings" element={<MonthlySpendings />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/charts" element={<Charts />} />
        <Route path="/group-management" element={<GroupManagement />} />
        <Route path="/add-spending" element={<AddSpending />} />
        <Route path="/test" element={<TestPage />} />
      </Route>
    </Routes>
  );
}

export default App;
