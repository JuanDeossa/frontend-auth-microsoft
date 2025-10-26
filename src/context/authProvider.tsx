import { useState } from "react";
import { AuthContext } from "./authContext";
import type { User } from "../types/user";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        setUser,
        setAccessToken,
        isAuthLoading,
        setIsAuthLoading,
        authError,
        setAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
