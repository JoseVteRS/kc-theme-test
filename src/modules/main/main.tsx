import { memo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/auth-provider";
import { useAuth } from "react-oidc-context";
import { KeycloakMain } from "../keycloak/main";

function HomePage() {
  const auth = useAuth();
  const loggedInUser = auth.user;

  const handleSignIn = () => {
    auth.signinRedirect({
      redirect_uri: window.location.origin,
    });
  }

  const handleLogOut = () => {
    auth.signoutRedirect({
      post_logout_redirect_uri: window.location.origin,
    });
  }

  if (loggedInUser) {
    return (
      <>
        <h1>Welcome!!</h1>
        <p>
          <b>{loggedInUser.profile.name}</b>, you are logged in! 🚀
        </p>
        <button onClick={() => handleLogOut()}>
          Logout
        </button>
      </>
    )
  }

  return (
    <>
      <h1>GiG - Keycloak Custom Themed Pages</h1>
      <h2>Login with Keycloak</h2>
      <p>This application allows users to authenticate using Keycloak, providing a seamless login experience.</p>
      <p>For more information, check the repository <a href="https://github.com/GiGInnovationLabs/endeavour-kc-usage-example" target="_blank" rel="noopener noreferrer">README</a> file.</p>
      <p>Ensure you have the necessary permissions to access the Keycloak features.</p>

      <h3>Click the button below to login</h3>
      <button onClick={() => handleSignIn()}>
        Login
      </button>
    </>
  );
}

export const Main = memo(() => {
  // Important: set to true to implement the pages locally
  const keycloakDebugMode = false;
  const isKeycloak =
        (window as unknown as { kcContext: unknown }).kcContext !== undefined || keycloakDebugMode;
  
  if (isKeycloak) {
    return <KeycloakMain />;
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
});

