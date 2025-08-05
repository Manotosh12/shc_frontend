// ✅ Manually mock the env variable for Jest
process.env.VITE_BACKEND_URL = 'http://localhost:3000';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Signup from './Signup';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('Signup Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form fields correctly', () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText('signup.email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('signup.password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('signup.name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('signup.phone')).toBeInTheDocument();
    expect(screen.getByText('signup.submit')).toBeInTheDocument();
  });

  it('submits form and shows success alert', async () => {
    (axios.post as jest.Mock).mockResolvedValue({ data: {} });
    window.alert = jest.fn();

    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

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

    fireEvent.click(screen.getByText('signup.submit'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:3000/auth/signup',
        {
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User',
          phone: '1234567890',
        }
      );
      expect(window.alert).toHaveBeenCalledWith('signup.successMessage');
    });
  });

  it('shows error message on failed signup', async () => {
    (axios.post as jest.Mock).mockRejectedValue({
      response: {
        data: { message: 'Email already exists' },
      },
    });

    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

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

    fireEvent.click(screen.getByText('signup.submit'));

    await waitFor(() => {
      expect(screen.getByText('Email already exists')).toBeInTheDocument();
    });
  });
});
