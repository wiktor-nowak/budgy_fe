import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Outside from "./pages/Outside";
import MonthlySpendings from "./pages/MonthlySpendings";
import Transactions from "./pages/Transactions";
import Charts from "./pages/Charts";
import ManageAccounts from "./pages/ManageAccounts";
import AddSpending from "./pages/AddSpending";
import TestPage from "./pages/TestPage";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Layout from "./layout/Layout";
import ProtectedRoute from "./layout/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Outside />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/spendings" element={<MonthlySpendings />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/manage-accounts" element={<ManageAccounts />} />
          <Route path="/add-spending" element={<AddSpending />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/account/:id" element={<Account />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
