import { createBrowserRouter } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import Login from "@/pages/auth/Login";
import Verified from "@/pages/auth/Verified";
import Register from "@/pages/auth/Register";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "./Layout";
import Home from "@/pages/Home";
import MonthlySpendings from "@/pages/MonthlySpendings";
import Transactions from "@/pages/Transactions";
import Charts from "@/pages/Charts";
import ManageAccounts from "@/pages/ManageAccounts";
import AddFirstAccount from "@/pages/auth/AddFirstAccount";
import Account from "@/pages/Account";
import Categories from "@/pages/Categories";
import Settings from "@/pages/Settings";
import TestPage from "@/pages/TestPage";
import NotFound from "./NotFound";
import Loading from "./Loading";

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/verified", element: <Verified /> },
    ],
    hydrateFallbackElement: <Loading />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          { index: true, element: <Home /> },
          { path: "spendings", element: <MonthlySpendings /> },
          { path: "transactions", element: <Transactions /> },
          { path: "charts", element: <Charts /> },
          { path: "manage-accounts", element: <ManageAccounts /> },
          { path: "test", element: <TestPage /> },
          { path: "settings", element: <Settings /> },
          { path: "account/:id", element: <Account /> },
          { path: "categories", element: <Categories /> },
          { path: "add-first", element: <AddFirstAccount /> },
        ],
      },
    ],
    hydrateFallbackElement: <Loading />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
