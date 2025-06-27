import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const auth = useAuth();
    const navigate = useNavigate();

  const signOutRedirect = () => {
    const clientId = "3uoobjh33ri6tuebivgcccmrfk";
    const logoutUri = "http://localhost:5173"; // Ensure this matches your redirect URI in Cognito
    const cognitoDomain = "https://ap-south-1rsw3jvpsk.auth.ap-south-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }
  // if (auth.isAuthenticated) {
  //   // Redirect to home page or any other page after successful authentication
  //   navigate("/");
  //   return null; // Prevent rendering the signup buttons
  // }

  return (
    <div>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
      <button onClick={() => signOutRedirect()}>Sign out</button>
    </div>
  );
}

export default Signup;