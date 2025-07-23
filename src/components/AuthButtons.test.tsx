import { render, screen, fireEvent } from '@testing-library/react';
import AuthButtons from './AuthButtons';
import { useAuth0 } from '@auth0/auth0-react';

// Mock useAuth0
jest.mock('@auth0/auth0-react');
const mockedUseAuth0 = useAuth0 as jest.Mock;

// Mock useNavigate
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('AuthButtons', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows Signup and Login when not authenticated', () => {
    const loginWithRedirect = jest.fn();
    mockedUseAuth0.mockReturnValue({
      loginWithRedirect,
      logout: jest.fn(),
      isAuthenticated: false,
    });

    render(<AuthButtons />);
    expect(screen.getByText(/Signup/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  it('navigates to /signup when Signup is clicked', () => {
    const loginWithRedirect = jest.fn();
    mockedUseAuth0.mockReturnValue({
      loginWithRedirect,
      logout: jest.fn(),
      isAuthenticated: false,
    });

    render(<AuthButtons />);
    fireEvent.click(screen.getByText(/Signup/i));
    expect(mockedNavigate).toHaveBeenCalledWith('/signup');
  });

  it('calls loginWithRedirect when Login is clicked', () => {
    const loginWithRedirect = jest.fn();
    mockedUseAuth0.mockReturnValue({
      loginWithRedirect,
      logout: jest.fn(),
      isAuthenticated: false,
    });

    render(<AuthButtons />);
    fireEvent.click(screen.getByText(/Login/i));
    expect(loginWithRedirect).toHaveBeenCalled();
  });

  it('shows Logout when authenticated', () => {
    const logout = jest.fn();
    mockedUseAuth0.mockReturnValue({
      loginWithRedirect: jest.fn(),
      logout,
      isAuthenticated: true,
    });

    render(<AuthButtons />);
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  it('calls logout when Logout is clicked', () => {
    const logout = jest.fn();
    mockedUseAuth0.mockReturnValue({
      loginWithRedirect: jest.fn(),
      logout,
      isAuthenticated: true,
    });

    render(<AuthButtons />);
    fireEvent.click(screen.getByText(/Logout/i));
    expect(logout).toHaveBeenCalledWith({ logoutParams: { returnTo: window.location.origin } });
  });
});