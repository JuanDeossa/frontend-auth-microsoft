import type { Configuration } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_CLIENT_ID, // Reemplaza por tu Client ID de Azure AD
    authority: `https://login.microsoftonline.com/${
      import.meta.env.VITE_TENANT_ID || "common"
    }`, // "common" para multi-tenant o tu tenantId
    redirectUri: import.meta.env.VITE_REDIRECT_URI, // Debe coincidir con uno de los Redirect URIs configurados en Azure AD
    postLogoutRedirectUri: "/",
  },
  cache: {
    cacheLocation: "localStorage", // "sessionStorage" si prefieres más seguridad
    storeAuthStateInCookie: false, // true solo si tienes problemas con cookies en navegadores antiguos
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return;
        switch (level) {
          case 0:
            console.error(message);
            break;
          case 1:
            console.warn(message);
            break;
          case 2:
            console.info(message);
            break;
          case 3:
            console.debug(message);
            break;
        }
      },
      logLevel: 2, // Info
      piiLoggingEnabled: false,
    },
  },
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
  scopes: ["User.Read"],
  prompt: "select_account",
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
