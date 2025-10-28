import { useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import type { User } from "../types/user";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { loginService } from "../services/loginService";
import { toast } from "sonner";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const { instance, accounts, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const handleLogoutMs = async () => {
    try {
      await instance.logout({
        account: accounts[0],
        onRedirectNavigate: () => false,
      });
      console.log("Logout successful");

      setUser(null);
      setAccessToken(null);
    } catch (err) {
      console.error("Error cerrando sesión: ", err);
      toast.error("Error cerrando sesión", {
        toasterId: "global",
        style: {
          backgroundColor: "#d43838ff",
          color: "#fff",
        },
      });
    }
  };

  useEffect(() => {
    // Verifica si el usuario está autenticado con MSAL y tiene un token válido
    // Si es así, llama al servicio de login para obtener los datos del usuario desde el backend
    if (
      inProgress === InteractionStatus.None &&
      isAuthenticated &&
      accounts.length > 0 &&
      accounts[0].idToken &&
      !user
    ) {
      setIsAuthLoading(true);

      loginService(accounts[0].idToken)
        .then((userData) => {
          setUser(userData.user);
          setAccessToken(userData.accessToken);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          toast.error(error?.message || "Error interno de servidor", {
            toasterId: "global",
            style: {
              backgroundColor: "#d43838ff",
              color: "#fff",
            },
          });
          handleLogoutMs();
        })
        .finally(() => {
          setIsAuthLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inProgress, isAuthenticated, accounts, user]);

  return (
    <AuthContext.Provider
      value={{
        // State
        user,
        accessToken,
        isAuthLoading,
        // Setters
        setUser,
        setAccessToken,
        setIsAuthLoading,
        // Handlers
        handleLogoutMs,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
