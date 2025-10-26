import {
  useContext,
  useEffect,
  // --- IGNORE ---
} from "react";
import { AuthContext } from "../context/authContext";
import { InteractionStatus } from "@azure/msal-browser";
import {
  useIsAuthenticated,
  useMsal,
  // --- IGNORE ---
} from "@azure/msal-react";
import { loginService } from "../services/loginService";
import { loginRequest } from "../msalConfig";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { instance, accounts, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }

  const {
    user,
    accessToken,
    authError,
    isAuthLoading,
    setIsAuthLoading,
    setUser,
    setAccessToken,
    setAuthError,
  } = context;

  const handleLoginMs = async () => {
    try {
      await instance.loginRedirect(loginRequest);
      console.log("Login successful");
    } catch (err) {
      console.error("Error iniciando sesión: ", err);
    }
  };

  const handleLogoutMs = async () => {
    try {
      await instance.logoutRedirect({
        account: accounts[0],
        onRedirectNavigate: () => false,
      });
      console.log("Logout successful");
    } catch (err) {
      console.error("Error cerrando sesión: ", err);
    }
  };

  useEffect(() => {
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
          setAuthError("Error en la autenticación");
        })
        .finally(() => {
          setIsAuthLoading(false);
        });
    }
  }, [
    inProgress,
    isAuthenticated,
    accounts,
    user,
    setIsAuthLoading,
    setUser,
    setAccessToken,
    setAuthError,
  ]);

  return {
    user,
    accessToken,
    accounts,
    inProgress,
    isAuthenticated,
    InteractionStatus,
    authError,
    isAuthLoading,
    //
    handleLoginMs,
    handleLogoutMs,
  };
};
