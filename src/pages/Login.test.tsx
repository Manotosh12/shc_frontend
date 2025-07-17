import { render, screen } from '@testing-library/react';
import Login from './Login';
import { useAuth0 } from '@auth0/auth0-react';
import { useLocation } from 'react-router-dom';

// Mock useAuth0
jest.mock('@auth0/auth0-react');
const mockedUseAuth0 = useAuth0 as jest.Mock;

// Mock useLocation
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

describe('Login Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls loginWithRedirect if not authenticated', () => {
    const loginWithRedirect = jest.fn();
    mockedUseAuth0.mockReturnValue({
      loginWithRedirect,
      isAuthenticated: false,
    });
    (useLocation as jest.Mock).mockReturnValue({ state: {} });

    render(<Login />);
    expect(loginWithRedirect).toHaveBeenCalled();
    expect(screen.getByText(/Redirecting to login/i)).toBeInTheDocument();
  });

  it('shows signup success message if redirected from signup', () => {
    const loginWithRedirect = jest.fn();
    mockedUseAuth0.mockReturnValue({
      loginWithRedirect,
      isAuthenticated: false,
    });
    (useLocation as jest.Mock).mockReturnValue({ state: { signupSuccess: true } });

    render(<Login />);
    expect(screen.getByText(/Signup successful! Please login./i)).toBeInTheDocument();
  });
});