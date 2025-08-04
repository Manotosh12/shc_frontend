import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FertilizerRecommendation from './FertilizerRecommendation';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18nTestConfig';
import * as api from '../services/api';

jest.mock('../services/api');

describe('FertilizerRecommendation', () => {
  const mockResponse = {
    data: {
      main_fertilizers: [
        { name: 'Urea', quantity: '100kg', provides: 'Nitrogen' },
      ],
      alternative_fertilizers: [
        { name: 'DAP', quantity: '80kg', provides: 'Nitrogen + Phosphorus' },
      ],
      organic: 'Use compost to increase organic carbon',
      ph_correction: 'Apply lime to correct soil pH',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithProviders = () =>
    render(
      <I18nextProvider i18n={i18n}>
        <FertilizerRecommendation />
      </I18nextProvider>
    );

  it('should submit form and display fertilizer recommendation results', async () => {
    (api.getFertilizerRecommendation as jest.Mock).mockResolvedValueOnce(mockResponse);

    const { container } = renderWithProviders();

    // Fill required nitrogen fields using name attributes
    fireEvent.change(container.querySelector('input[name="nLow"]')!, { target: { value: '1' } });
    fireEvent.change(container.querySelector('input[name="nMedium"]')!, { target: { value: '2' } });
    fireEvent.change(container.querySelector('input[name="nHigh"]')!, { target: { value: '3' } });

    // Submit
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Wait for API and results
    await waitFor(() => {
      expect(api.getFertilizerRecommendation).toHaveBeenCalledWith({
        n: { Low: 1, Medium: 2, High: 3 },
        p: { Low: 0, Medium: 0, High: 0 },
        k: { Low: 0, Medium: 0, High: 0 },
        OC: { Low: 0, Medium: 0, High: 0 },
        pH: { Acidic: 0, Neutral: 0, Alkaline: 0 },
      });
    });

    // Expect results
    expect(await screen.findByText(/Fertilizer Recommendation Results/i)).toBeInTheDocument();
    expect(screen.getByText(/Urea - 100kg/)).toBeInTheDocument();
    expect(screen.getByText(/DAP - 80kg/)).toBeInTheDocument();
    expect(screen.getByText(/Use compost/)).toBeInTheDocument();
    expect(screen.getByText(/Apply lime/)).toBeInTheDocument();
  });
});
