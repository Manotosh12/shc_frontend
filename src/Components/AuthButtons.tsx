// src/components/AuthButtons.tsx
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const AuthButtons = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  return (
    <div className="flex gap-2">
      {!isAuthenticated ? (
        <>
          <button
            onClick={() => navigate('/signup')}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Signup
          </button>
          <button
            onClick={() => loginWithRedirect()}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Login
          </button>
        </>
      ) : (
        <button
          onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default AuthButtons;
