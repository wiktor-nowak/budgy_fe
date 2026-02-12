import { Navigate, Outlet } from "react-router-dom";
import { useAccessToken } from "@/lib/hooks/auth";
import { useAccountsCount } from "@/lib/hooks/accounts";
import AddFirstAccount from "@/pages/auth/AddFirstAccount";
import Loading from "./Loading";

const ProtectedRoute = () => {
  const {
    data: token,
    isLoading: tokenFetchLoading,
    error: accessTokenError,
  } = useAccessToken();
  const {
    data,
    isLoading: accountsCountLoading,
    error: accountsCountError,
  } = useAccountsCount();

  if (accountsCountLoading || tokenFetchLoading) {
    return <Loading />;
  }

  if (!token || accountsCountError || accessTokenError)
    return <Navigate to="/login" replace />;

  if (data.response === 0) return <AddFirstAccount />;

  return <Outlet />;
};

export default ProtectedRoute;
