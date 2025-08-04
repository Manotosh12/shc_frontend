import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FertilizerRecommendation from './FertilizerRecommendation';
import axios from 'axios';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18nTestConfig';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('FertilizerRecommendation Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all input fields and the submit button', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <FertilizerRecommendation />
      </I18nextProvider>
    );

    // Check for input fields (spinbutton = number inputs)
    const inputs = screen.getAllByRole('spinbutton');
    expect(inputs.length).toBe(15); // Adjust count if the form changes

    // Check for translated submit button
    const submitButton = screen.getByRole('button', {
      name: /submit/i, // or use: i18n.t('fertilizer.submit')
    });
    expect(submitButton).toBeInTheDocument();
  });

  it('submits form and displays results', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        main_fertilizers: [
          { name: 'Urea', quantity: '50kg', provides: 'N' },
        ],
        alternative_fertilizers: [
          { name: 'DAP', quantity: '40kg', provides: 'N, P' },
        ],
        organic: 'Use FYM 5 tons/acre',
        ph_correction: 'Apply 2 qtl/acre Lime',
      },
    });

    render(
      <I18nextProvider i18n={i18n}>
        <FertilizerRecommendation />
      </I18nextProvider>
    );

    // Simulate user input (you can select better input fields using aria-labels if added)
    const inputs = screen.getAllByRole('spinbutton');
    fireEvent.change(inputs[0], { target: { value: '10' } });
    fireEvent.change(inputs[1], { target: { value: '20' } });
    fireEvent.change(inputs[2], { target: { value: '30' } });

    // Submit the form
    const submitButton = screen.getByRole('button', {
      name: /submit/i,
    });
    fireEvent.click(submitButton);

    // Wait for results section
    await waitFor(() =>
      expect(screen.getByText(/fertilizer recommendation results/i)).toBeInTheDocument()
    );

    // Assert result values
    expect(screen.getByText(/urea/i)).toBeInTheDocument();
    expect(screen.getByText(/DAP/i)).toBeInTheDocument();
    expect(screen.getByText(/FYM/i)).toBeInTheDocument();
    expect(screen.getByText(/Lime/i)).toBeInTheDocument();
  });
});
