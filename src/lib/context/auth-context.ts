import { createContext } from "react";

export interface AuthContextValue {
  // User object - for the future, I want to keep settings here!
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
