import { render, screen } from '@testing-library/react';
import Layout from './Layout';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n'; // 👈 Your actual config
import '@testing-library/jest-dom';

// Optional: You can mock Navbar and Footer if you want isolation
jest.mock('./Navbar', () => () => <nav data-testid="navbar">Mocked Navbar</nav>);
jest.mock('./Footer', () => () => <footer data-testid="footer">Mocked Footer</footer>);

describe('Layout Component', () => {
  it('renders navbar, children, and footer', () => {
    const childText = 'This is page content';

    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18n}>
          <Layout>
            <div>{childText}</div>
          </Layout>
        </I18nextProvider>
      </MemoryRouter>
    );

    // Navbar and Footer from mock
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();

    // Check that children are rendered inside layout
    expect(screen.getByText(childText)).toBeInTheDocument();
  });
});
