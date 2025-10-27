import { Navigate } from "react-router";

export const MsalAuthCallback = () => {
  return <Navigate to="/account/login?mode=msal" replace />;
};
