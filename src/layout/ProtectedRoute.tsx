import { Outlet } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { refreshAuthToken } from "../api/auth";
// import { Spinner } from "@/components/ui/spinner";

const ProtectedRoute = () => {
  // if (isLoading) {
  //   return <Spinner className="size-20 text-green-500" />;
  // }

  return <Outlet />;
  // : <Navigate to="/" replace />;
};

export default ProtectedRoute;
