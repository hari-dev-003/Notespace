import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.ap-south-1.amazonaws.com/ap-south-1_rsw3JvPsk",
  client_id: "3uoobjh33ri6tuebivgcccmrfk",
  redirect_uri: "http://localhost:5173",
  response_type: "code",
  scope: "phone openid email",
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <AuthProvider {...cognitoAuthConfig}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </AuthProvider>

  </StrictMode>,
)
