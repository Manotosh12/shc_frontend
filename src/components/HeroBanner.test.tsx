import { render, screen } from '@testing-library/react';
import HeroBanner from './HeroBanner';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18nTestConfig';
import '@testing-library/jest-dom';

describe('HeroBanner Component', () => {
  it('renders the translated hero title', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <HeroBanner />
      </I18nextProvider>
    );

    const heading = screen.getByRole('heading', {
      name: /Empowering Farmers with Soil Intelligence/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders the translated hero description', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <HeroBanner />
      </I18nextProvider>
    );

    const description = screen.getByText(/Precision farming starts with healthy soil\./i);
    expect(description).toBeInTheDocument();
  });

  it('renders the Nutrient Dashboard button with emoji', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <HeroBanner />
      </I18nextProvider>
    );

    expect(screen.getByText('📊')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Nutrient Dashboard/i })).toBeInTheDocument();
  });

  it('renders the Fertilizer Recommendation button with emoji', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <HeroBanner />
      </I18nextProvider>
    );

    expect(screen.getByText('🪴')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Fertilizer Recommendation/i })).toBeInTheDocument();
  });

  it('has a section with correct aria-label', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <HeroBanner />
      </I18nextProvider>
    );

    const section = screen.getByLabelText(/Hero Section/i);
    expect(section).toBeInTheDocument();
  });
});
