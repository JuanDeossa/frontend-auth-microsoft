import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";

import { Login } from "./components/login";
import { PublicLayout } from "./components/publicLayout";
import { msalConfig } from "./msalConfig";
import { AuthProvider } from "./context/authProvider";
import { PrivateLayout } from "./components/privateLayout";
import { Dashboard } from "./components/dashboard";
import { NotFound } from "./components/notFound";
import { MsalAuthCallback } from "./components/msalAuthCallback";
import { AdfsAuthCallback } from "./components/adfsAuthCallback";
// import { Dashboard } from "./components/dashboard";
// import { NotFound } from "./components/notFound";
// import { PrivateLayout } from "./components/privateLayout";
// import { AdfsAuthCallback } from "./components/adfsAuthCallback";
// import { MsalAuthCallback } from "./components/msalAuthCallback";

const msalInstance = new PublicClientApplication(msalConfig);

function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route index path="/" element={<AdfsAuthCallback />} />
              <Route path="/admin/dashboard" element={<MsalAuthCallback />} />
              <Route path="/account/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route element={<PrivateLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </MsalProvider>
  );
}

export default App;
