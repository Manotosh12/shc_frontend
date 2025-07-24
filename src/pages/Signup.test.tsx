import { render, screen, fireEvent } from '@testing-library/react';
import Signup from './Signup';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock useNavigate
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('Signup Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderWithRouter(ui: React.ReactElement) {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  }

  it('renders the signup form', () => {
    renderWithRouter(<Signup />);
    expect(screen.getByText(/Signup/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Phone Number/i)).toBeInTheDocument();
  });

  it('shows error message on failed signup', async () => {
    mockedAxios.post.mockRejectedValueOnce({
      isAxiosError: true,
      response: {
        data: { message: 'Email already exists' }
      },
    });

    renderWithRouter(<Signup />);
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText(/Full Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByPlaceholderText(/Phone Number/i), { target: { value: '1234567890' } });

    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    // Directly wait for the error message to appear
    const errorMessage = await screen.findByText(/Email already exists/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('redirects to login on successful signup', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {},
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        url: ''
      },
    });

    renderWithRouter(<Signup />);
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText(/Full Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByPlaceholderText(/Phone Number/i), { target: { value: '1234567890' } });

    // Mock window.alert
    window.alert = jest.fn();

    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    await screen.findByText(/Signup successful/i);
    expect(window.alert).toHaveBeenCalledWith('Signup successful! Redirecting to login...');
    expect(mockedNavigate).toHaveBeenCalledWith('/login', { state: { signupSuccess: true } });
  });
});

