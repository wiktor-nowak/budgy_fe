import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Outside from "./pages/Outside";
import MonthlySpendings from "./pages/MonthlySpendings";
import Transactions from "./pages/Transactions";
import Charts from "./pages/Charts";
import GroupManagement from "./pages/GroupManagement";
import AddSpending from "./pages/AddSpending";
import TestPage from "./pages/TestPage";
// import Header from "./components/main/Header";
// import SideBar from "./components/main/SideBar";
// import Footer from "./components/main/Footer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Outside />} />
      <Route>
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

// element={<AppLayout />}
