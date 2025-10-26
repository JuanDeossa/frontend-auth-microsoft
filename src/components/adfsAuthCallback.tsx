import { Navigate } from "react-router";
import { useNav } from "../hooks/useNav";

export const AdfsAuthCallback = () => {
  const { params } = useNav();
  const { code, state } = params;

  if (!code || !state) {
    return <Navigate to="/account/login" replace />;
  }

  return <h1>Autenticando... (ADFS)</h1>;
};
