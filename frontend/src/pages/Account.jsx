import { useAuth } from "react-oidc-context";


const Account = () => {

    const auth = useAuth();

    const signOutRedirect = () => {
      const clientId = "3uoobjh33ri6tuebivgcccmrfk";
      const logoutUri = "http://localhost:5173"; // Ensure this matches your redirect URI in Cognito
      const cognitoDomain = "https://ap-south-1rsw3jvpsk.auth.ap-south-1.amazoncognito.com";
      window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
    };


 if (auth.isAuthenticated) {
    return (
      <div>
        
        <pre> Hello: {auth.user?.profile.email} </pre>
        <pre> ID Token: {auth.user?.id_token} </pre>
        <pre> Access Token: {auth.user?.access_token} </pre>
        <pre> Refresh Token: {auth.user?.refresh_token} </pre>

        <button onClick={() => auth.removeUser()}>Sign out</button>
      </div>
    );
  }


  return (
    <>
        <div>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
      <button onClick={() => signOutRedirect()}>Sign out</button>
    </div>
    </>
  );
}

export default Account;