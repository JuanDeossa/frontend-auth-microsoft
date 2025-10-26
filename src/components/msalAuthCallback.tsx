import { Navigate } from "react-router";
import { useNav } from "../hooks/useNav";
// import { useAuth } from "../hooks/useAuth";

export const MsalAuthCallback = () => {
  const { params } = useNav();

  const token = params.token || null;

  debugger;

  return <Navigate to="/?mode=msal" replace />;
};
