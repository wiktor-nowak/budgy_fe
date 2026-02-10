import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { Spinner } from "@/components/ui/spinner";
import { AuthContext } from "@/lib/context/auth-context";

const ProtectedRoute = () => {
  const auth = useContext(AuthContext);
  if (auth?.isLoading) {
    return (
      <div className="w-full flex flex-col justify-center self-center">
        <Spinner className="size-20 text-green-500 mx-auto" />
      </div>
    );
  }

  return auth?.isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
