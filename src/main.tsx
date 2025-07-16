import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import './i18n'; 
import { Auth0Provider } from "@auth0/auth0-react";

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

// ✅ Log for debugging before throwing error
console.log("Auth0 Domain:", domain);
console.log("Auth0 Client ID:", clientId);
console.log("Auth0 Audience:", audience);

if (!domain || !clientId) {
  throw new Error("Auth0 domain or clientId is missing. Check your .env file.");
}


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: audience,
        }}>
        <App />
      </Auth0Provider>
  </React.StrictMode>
);
