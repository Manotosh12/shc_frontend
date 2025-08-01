
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FertilizerRecommendation from './FertilizerRecommendation';
import axios from 'axios';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n.test'; // 👈 use test i18n

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('FertilizerRecommendation Component', () => {
  it('renders all input fields and the submit button', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <FertilizerRecommendation />
      </I18nextProvider>
    );

    const inputs = screen.getAllByRole('spinbutton');
    expect(inputs.length).toBe(15);

    const submitButton = screen.getByRole('button', { name: /get recommendation/i });
    expect(submitButton).toBeInTheDocument();
  });

  it('submits form and displays results', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        main_fertilizers: [
          { name: 'Urea', quantity: '50kg', provides: 'N' }
        ],
        alternative_fertilizers: [
          { name: 'DAP', quantity: '40kg', provides: 'N, P' }
        ],
        organic: 'Use FYM 5 tons/acre',
        ph_correction: 'Apply 2 qtl/acre Lime'
      }
    });

    render(
      <I18nextProvider i18n={i18n}>
        <FertilizerRecommendation />
      </I18nextProvider>
    );

    fireEvent.change(screen.getAllByPlaceholderText('Low')[0], { target: { value: '10' } });
    fireEvent.change(screen.getAllByPlaceholderText('Medium')[0], { target: { value: '20' } });
    fireEvent.change(screen.getAllByPlaceholderText('High')[0], { target: { value: '30' } });

    fireEvent.click(screen.getByRole('button', { name: /get recommendation/i }));

    await waitFor(() =>
      expect(screen.getByText(/fertilizer recommendation results/i)).toBeInTheDocument()
    );

    expect(screen.getByText(/urea/i)).toBeInTheDocument();
    expect(screen.getByText(/DAP/i)).toBeInTheDocument();
    expect(screen.getByText(/FYM/i)).toBeInTheDocument();
    expect(screen.getByText(/Lime/i)).toBeInTheDocument();
  });
});
