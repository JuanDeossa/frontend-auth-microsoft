import {
  useContext,
  // --- IGNORE ---
} from "react";
import { AuthContext } from "../context/authContext";
import { InteractionStatus } from "@azure/msal-browser";
import {
  useIsAuthenticated,
  useMsal,
  // --- IGNORE ---
} from "@azure/msal-react";
import { loginRequest } from "../msalConfig";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { instance, accounts, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }

  const { user, accessToken, isAuthLoading, handleLogoutMs } = context;

  const handleLoginMs = async () => {
    try {
      await instance.loginPopup({
        ...loginRequest,
      });
      console.log("Login successful");
    } catch (err) {
      console.error("Error iniciando sesión: ", err);
    }
  };

  return {
    user,
    accessToken,
    accounts,
    inProgress,
    isAuthenticated,
    InteractionStatus,
    isAuthLoading,
    //
    handleLoginMs,
    handleLogoutMs,
  };
};
