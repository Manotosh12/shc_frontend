import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Login = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect({
        appState:{
            returnTo: '/'
        }
      });
    }
  }, [isAuthenticated, loginWithRedirect]);

  return (
    <div className="flex items-center justify-center min-h-screen">
        {location.state?.signupSuccess && (
            <p className="text-green-600 mb-4">Signup successful! Please login.</p>
        )}
      <p className="text-xl font-semibold text-gray-700">Redirecting to login...</p>
    </div>
  );
};

export default Login;
