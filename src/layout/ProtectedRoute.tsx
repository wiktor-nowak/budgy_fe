import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/lib/context/authContext";
import Loading from "./Loading";
import { useAccessStatus } from "@/lib/hooks/auth";

const ProtectedRoute = () => {
  const tokenStore = useContext(AuthContext);
  const token = tokenStore?.get();
  const location = useLocation();
  const {
    data: accessStatus,
    isLoading,
    isError,
  } = useAccessStatus(Boolean(token));

  if (!token) return <Navigate to="/login" replace />;
  if (isLoading) return <Loading />;
  if (isError) return <Navigate to="/login" replace />;

  const isAddFirstRoute = location.pathname === "/add-first";
  const hasMainAccount = accessStatus?.hasMainAccount ?? false;

  if (!hasMainAccount && !isAddFirstRoute) {
    return <Navigate to="/add-first" replace />;
  }

  if (hasMainAccount && isAddFirstRoute) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
