import { render, screen } from '@testing-library/react';
import PrivateRoute from './PrivateRoute';
import { useAuth0 } from '@auth0/auth0-react';
import { MemoryRouter } from 'react-router-dom';

// Mock useAuth0
jest.mock('@auth0/auth0-react');
const mockedUseAuth0 = useAuth0 as jest.Mock;

// Mock useLocation (not strictly needed for this test, but included for completeness)
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({ pathname: '/protected' }),
  Navigate: ({ to }: { to: string }) => <div>Navigate to {to}</div>,
}));

describe('PrivateRoute', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading when isLoading is true', () => {
    mockedUseAuth0.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
    });

    render(
      <MemoryRouter>
        <PrivateRoute>
          <div>Protected Content</div>
        </PrivateRoute>
      </MemoryRouter>
    );
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('renders children when authenticated', () => {
    mockedUseAuth0.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
    });

    render(
      <MemoryRouter>
        <PrivateRoute>
          <div>Protected Content</div>
        </PrivateRoute>
      </MemoryRouter>
    );
    expect(screen.getByText(/Protected Content/i)).toBeInTheDocument();
  });

  it('navigates to /login when not authenticated', () => {
    mockedUseAuth0.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
    });

    render(
      <MemoryRouter>
        <PrivateRoute>
          <div>Protected Content</div>
        </PrivateRoute>
      </MemoryRouter>
    );
    expect(screen.getByText(/Navigate to \/login/i)).toBeInTheDocument();
  });
});