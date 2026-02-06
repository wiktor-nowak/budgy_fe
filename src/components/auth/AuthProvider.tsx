import { tokenStore } from "@/lib/api/tokenStore";
import { useAccessToken } from "@/lib/hooks/use-access-token";
import { AuthContext, type AuthContextValue } from "@/lib/context/auth-context";
import { queryClient } from "@/lib/query/queryClient";

import { type ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function AuthProvider({ children }: LayoutProps) {
  const { data, isLoading, error } = useAccessToken();

  const logout = () => {
    tokenStore.clear();
    queryClient.clear();
  };

  const value: AuthContextValue = {
    isAuthenticated: !!data && !error,
    isLoading,
    logout,
  };

  return (
    <>
      <AuthContext value={value}>{children}</AuthContext>
    </>
  );
}
