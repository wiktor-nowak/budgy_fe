import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { refreshAuthToken } from "../api/auth";
import { Spinner } from "@/components/ui/spinner";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      refreshAuthToken();
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return <Spinner className="size-20 text-green-500" />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
