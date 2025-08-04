import { render, screen } from '@testing-library/react';
import HeroBanner from './HeroBanner';
import { I18nextProvider } from 'react-i18next';

import '@testing-library/jest-dom';
import i18n from '../i18nTestConfig';


describe('HeroBanner Component', () => {
  const originalLocation = window.location;

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        href: '',
        assign: jest.fn(),
      },
    });
  });

  afterAll(() => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: originalLocation,
    });
  });

  test('renders HeroBanner with translated text', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <HeroBanner />
      </I18nextProvider>
    );

  it('renders the translated hero title', () => {
    expect(
      screen.getByRole('heading', { name: /Empowering Farmers with Soil Intelligence/i })
    ).toBeInTheDocument();
  });

  it('renders the translated hero description', () => {
    expect(
      screen.getByText(/Precision farming starts with healthy soil\./i)
    ).toBeInTheDocument();
  });

  it('renders the Nutrient Dashboard button with emoji', () => {
    expect(screen.getByText('📊')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Nutrient Dashboard/i })).toBeInTheDocument();
  });

  it('renders the Fertilizer Recommendation button with emoji', () => {
    expect(screen.getByText('🪴')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Fertilizer Recommendation/i })).toBeInTheDocument();
  });

  it('renders the section with correct aria-label', () => {
    expect(screen.getByLabelText(/Hero Section/i)).toBeInTheDocument();
  });
});
