import { tokenStore } from "../api/tokenStore";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthContext.Provider value={tokenStore}>{children}</AuthContext.Provider>
  );
}
