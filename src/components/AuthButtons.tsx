import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AuthButtons = () => {
  const { t } = useTranslation();
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  return (
    <div className="flex gap-2">
      {!isAuthenticated ? (
        <>
          <button
            onClick={() => navigate('/signup')}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {t('auth.signup')}
          </button>
          <button
            onClick={() => loginWithRedirect()}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {t('auth.login')}
          </button>
        </>
      ) : (
        <button
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          {t('auth.logout')}
        </button>
      )}
    </div>
  );
};

export default AuthButtons;
