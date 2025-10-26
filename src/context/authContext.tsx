import { createContext } from "react";
import type { User } from "../types/user";

interface AuthContextType {
  user: User | null;
  isAuthLoading: boolean;
  authError: string | null;
  accessToken: string | null;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  setIsAuthLoading: (isLoading: boolean) => void;
  setAuthError: (error: string | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
