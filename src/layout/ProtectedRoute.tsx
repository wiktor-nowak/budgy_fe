import { Navigate, Outlet } from "react-router-dom";
// import Loading from "./Loading";
import { useContext } from "react";
import { AuthContext } from "@/lib/context/authContext";

const ProtectedRoute = () => {
  const tokenStore = useContext(AuthContext);
  const token = tokenStore?.get();

  if (!token) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
