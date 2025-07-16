import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';


// Mock i18n
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key, // Return key as-is
    i18n: {
      changeLanguage: jest.fn(),
    },
  }),
}));

describe('Navbar Component', () => {
  beforeEach(() => {
    render(<Navbar />);
  });

  test('renders logo and title', () => {
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByText('navbar.title')).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    expect(screen.getByText('navbar.links.home')).toBeInTheDocument();
    expect(screen.getByText('navbar.links.about')).toBeInTheDocument();
    expect(screen.getByText('navbar.links.services')).toBeInTheDocument();
    expect(screen.getByText('navbar.links.contact')).toBeInTheDocument();
  });

  test('renders login button and opens modal on click', () => {
    const loginBtn = screen.getByText('navbar.login.button');
    fireEvent.click(loginBtn);

    expect(screen.getByText('navbar.login.title')).toBeInTheDocument();
    expect(screen.getByText('navbar.login.subtitle')).toBeInTheDocument();
  });

  test('closes login modal on cancel button click', () => {
    fireEvent.click(screen.getByText('navbar.login.button'));

    const cancelBtn = screen.getByText('navbar.login.cancel');
    fireEvent.click(cancelBtn);

    expect(screen.queryByText('navbar.login.title')).not.toBeInTheDocument();
  });

  test('submits login form and closes modal', () => {
    fireEvent.click(screen.getByText('navbar.login.button'));

    const usernameInput = screen.getByLabelText('navbar.login.username');
    const passwordInput = screen.getByLabelText('navbar.login.password');
    const submitBtn = screen.getByText('navbar.login.submit');

    fireEvent.change(usernameInput, { target: { value: 'deepika' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.click(submitBtn);

    expect(screen.queryByText('navbar.login.title')).not.toBeInTheDocument();
  });

  test('renders language dropdown and allows selection', () => {
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Hindi' } });

    // You can extend this to test if i18n.changeLanguage was called
    expect(select).toHaveValue('Hindi');
  });
});
