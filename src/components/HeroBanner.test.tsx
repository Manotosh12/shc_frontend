import { render, screen } from '@testing-library/react';
import HeroBanner from './HeroBanner';

import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n.test';

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

    expect(screen.getByRole('heading', { name: /Empowering Farmers/i })).toBeInTheDocument();
    expect(screen.getByText(/Precision farming starts/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Nutrient Dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Fertilizer Recommendation/i })).toBeInTheDocument();
  });
});
