import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';

import '@testing-library/jest-dom';
import i18n from '../i18nTestConfig';

describe('Footer Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18n}>
          <Footer />
        </I18nextProvider>
      </MemoryRouter>
    );
  });

  it('renders logo and translated title', () => {
    expect(screen.getByAltText('Soil Health Card Logo')).toBeInTheDocument();
    expect(screen.getByText(i18n.t('footer.title'))).toBeInTheDocument(); // SoilXpert
  });

  it('renders all quick links with translations and correct routes', () => {
    expect(screen.getByText(i18n.t('footer.quickLinks.home'))).toHaveAttribute('href', '/');
    expect(screen.getByText(i18n.t('footer.quickLinks.about'))).toHaveAttribute('href', '/about');
    expect(screen.getByText(i18n.t('footer.quickLinks.services'))).toHaveAttribute('href', '/services');
    expect(screen.getByText(i18n.t('footer.quickLinks.contact'))).toHaveAttribute('href', '/contact');
  });

  it('displays important links text from i18n', () => {
    expect(screen.getByText(i18n.t('footer.importantLinks.weather'))).toBeInTheDocument(); // Weather Advisory
  });

  it('renders contact section from translations', () => {
    expect(screen.getByText(i18n.t('footer.contact.address'))).toBeInTheDocument(); // XYZ
    expect(screen.getByText(i18n.t('footer.contact.phone'))).toBeInTheDocument(); // +91-xxxxxxxxxx
    expect(screen.getByText(i18n.t('footer.contact.email'))).toBeInTheDocument(); // XXXXXX@gmail.com
  });
});
