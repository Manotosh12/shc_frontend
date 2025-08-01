// Signup.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Signup from './Signup';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';


// Mock useNavigate
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock i18n
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Signup Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form inputs and button', () => {
    renderWithRouter(<Signup />);
    expect(screen.getByPlaceholderText('signup.email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('signup.password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('signup.name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('signup.phone')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('signup.submit');
  });

  it('shows error on failed signup', async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: { data: { message: 'User already exists' } },
    });

    renderWithRouter(<Signup />);
    fireEvent.change(screen.getByPlaceholderText('signup.email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('signup.password'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText('signup.name'), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByPlaceholderText('signup.phone'), {
      target: { value: '1234567890' },
    });

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() =>
      expect(screen.getByText('User already exists')).toBeInTheDocument()
    );
  });

  it('redirects to login on successful signup', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: {} });

    renderWithRouter(<Signup />);
    fireEvent.change(screen.getByPlaceholderText('signup.email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('signup.password'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText('signup.name'), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByPlaceholderText('signup.phone'), {
      target: { value: '1234567890' },
    });

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'http://localhost:3000/auth/signup',
        {
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User',
          phone: '1234567890',
        }
      );
      expect(mockedUsedNavigate).toHaveBeenCalledWith('/login', {
        state: { signupSuccess: true },
      });
    });
  });
});
