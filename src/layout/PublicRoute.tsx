import { AuthContext } from "@/lib/context/authContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const tokenStore = useContext(AuthContext);
  const token = tokenStore?.get();

  if (token) return <Navigate to="/" replace />;

  return (
    <main className="w-full h-full max-w-md mx-auto flex flex-col justify-center">
      <Outlet />
    </main>
  );
};

export default PublicRoute;
