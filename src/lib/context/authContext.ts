import { createContext } from "react";
import type { TokenStoreType } from "../api/tokenStore";

export const AuthContext = createContext<TokenStoreType | null>(null);
