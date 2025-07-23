
import { render, screen } from '@testing-library/react';
import HeroBanner from './HeroBanner';
import '@testing-library/jest-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n.test';


describe('HeroBanner Component', () => {
  beforeEach(() => {
    render(
      <I18nextProvider i18n={i18n}>
        <HeroBanner />
      </I18nextProvider>
    );
  });

  test('renders the hero section title', () => {
    const heading = screen.getByRole('heading', {
      name: /Empowering Farmers with Soil Intelligence/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test('renders the hero section description', () => {
    const description = screen.getByText(
      /Get accurate soil health data, insights, and crop-specific fertilizer recommendations./i
    );
    expect(description).toBeInTheDocument();
  });

  test('renders the Nutrient Dashboard button', () => {
    const nutrientBtn = screen.getByRole('button', {
      name: /Nutrient Dashboard/i,
    });
    expect(nutrientBtn).toBeInTheDocument();
  });

  test('renders the Fertilizer Recommendation button', () => {
    const fertilizerBtn = screen.getByRole('button', {
      name: /Fertilizer Recommendation/i,
    });
    expect(fertilizerBtn).toBeInTheDocument();
  });

  test('aria-label is applied to hero section', () => {
    const section = screen.getByLabelText(/Hero section showing soil health insights/i);
    expect(section).toBeInTheDocument();
  });
});
