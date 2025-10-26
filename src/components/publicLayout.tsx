import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";

export const PublicLayout = () => {
  const {
    inProgress,
    InteractionStatus,
    isAuthenticated,
    user,
    isAuthLoading,
  } = useAuth();

  if (inProgress === InteractionStatus.None && isAuthenticated && user) {
    return <Navigate to="/dashboard" replace />;
  }

  if (inProgress !== InteractionStatus.None || isAuthLoading) {
    return <h1>Autenticando...</h1>;
  }

  return <Outlet />;
};
