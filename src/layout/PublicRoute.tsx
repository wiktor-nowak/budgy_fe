import { AuthContext } from "@/lib/context/authContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "./Loading";
import { useAccessStatus } from "@/lib/hooks/auth";

const PublicRoute = () => {
  const tokenStore = useContext(AuthContext);
  const token = tokenStore?.get();
  const {
    data: accessStatus,
    isLoading,
    isError,
  } = useAccessStatus(Boolean(token));

  if (token && isLoading) return <Loading />;
  if (token && isError) return <Navigate to="/" replace />;
  if (token) {
    return (
      <Navigate
        to={accessStatus?.hasMainAccount ? "/" : "/add-first"}
        replace
      />
    );
  }

  return (
    <main className="w-full h-full max-w-md mx-auto flex flex-col justify-center">
      <Outlet />
    </main>
  );
};

export default PublicRoute;
