import { Outlet, Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export const PrivateLayout = () => {
  const { isAuthenticated, InteractionStatus, inProgress } = useAuth();

  if (inProgress !== InteractionStatus.None) {
    return <h1>Autenticando...</h1>;
  }

  if (inProgress === InteractionStatus.None && !isAuthenticated) {
    return <Navigate to="/account/login" replace />;
  }

  return <Outlet />;
};
