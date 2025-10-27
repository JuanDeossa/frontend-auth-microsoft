import { createContext } from "react";
import type { User } from "../types/user";

interface AuthContextType {
  user: User | null;
  isAuthLoading: boolean;
  accessToken: string | null;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  setIsAuthLoading: (isLoading: boolean) => void;
  handleLogoutMs: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
