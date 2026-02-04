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
import Categories from "./pages/Categories";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { Suspense } from "react";
import { Spinner } from "./components/ui/spinner";
import { ThemeProvider } from "./components/theme/ThemeProvider";

function App() {
  return (
    <Suspense fallback={<Spinner className="size-20 text-green-500" />}>
      <ThemeProvider defaultTheme="dark">
        <Routes>
          {}
          <Route element={<Outside />}>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
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
              <Route path="/categories" element={<Categories />} />
            </Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
