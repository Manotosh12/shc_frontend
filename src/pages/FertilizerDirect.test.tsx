import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { getFertilizerDirectRecommendation } from '../services/api';
import FertilizerDirect from './FertilizerDirect';

// Mock the API module
jest.mock('../services/api', () => ({
  getFertilizerDirectRecommendation: jest.fn(),
}));

describe('FertilizerDirect Component', () => {
  const mockResponse = {
    data: {
      main_fertilizers: [
        { name: 'Urea', quantity: '50 kg/ha', provides: 'Nitrogen' },
        { name: 'DAP', quantity: '40 kg/ha', provides: 'Phosphorus' },
      ],
      alternative_fertilizers: [
        { name: 'MOP', quantity: '25 kg/ha', provides: 'Potassium' },
      ],
      organic: 'Add compost 2 tons/ha',
      ph_correction: 'Apply lime if pH < 6.0',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the form inputs correctly', () => {
    render(<FertilizerDirect />);

    expect(screen.getByLabelText(/Nitrogen/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phosphorus/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Potassium/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Organic Carbon/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^pH$/i)).toBeInTheDocument();
  });

  test('submits the form and displays recommendations', async () => {
    (getFertilizerDirectRecommendation as jest.Mock).mockResolvedValue(mockResponse);

    render(<FertilizerDirect />);

    // Fill input fields
    fireEvent.change(screen.getByLabelText(/Nitrogen/i), { target: { value: '50' } });
    fireEvent.change(screen.getByLabelText(/Phosphorus/i), { target: { value: '40' } });
    fireEvent.change(screen.getByLabelText(/Potassium/i), { target: { value: '30' } });
    fireEvent.change(screen.getByLabelText(/Organic Carbon/i), { target: { value: '1.5' } });
    fireEvent.change(screen.getByLabelText(/^pH$/i), { target: { value: '6.5' } });

    fireEvent.click(screen.getByRole('button', { name: /Get Recommendations/i }));

    // Wait for results
    await waitFor(() => {
      expect(getFertilizerDirectRecommendation).toHaveBeenCalledTimes(1);
      expect(screen.getByText(/Urea/i)).toBeInTheDocument();
      expect(screen.getByText(/DAP/i)).toBeInTheDocument();
      expect(screen.getByText(/Add compost/i)).toBeInTheDocument();
      expect(screen.getByText(/Apply lime/i)).toBeInTheDocument();
    });
  });

  test('handles API errors gracefully', async () => {
    (getFertilizerDirectRecommendation as jest.Mock).mockRejectedValue(new Error('Network Error'));

    render(<FertilizerDirect />);

    fireEvent.change(screen.getByLabelText(/Nitrogen/i), { target: { value: '50' } });
    fireEvent.change(screen.getByLabelText(/Phosphorus/i), { target: { value: '40' } });
    fireEvent.change(screen.getByLabelText(/Potassium/i), { target: { value: '30' } });
    fireEvent.change(screen.getByLabelText(/Organic Carbon/i), { target: { value: '1.5' } });
    fireEvent.change(screen.getByLabelText(/^pH$/i), { target: { value: '6.5' } });

    fireEvent.click(screen.getByRole('button', { name: /Get Recommendations/i }));

    await waitFor(() => {
      expect(screen.getByText(/Network Error/i)).toBeInTheDocument();
    });
  });
});
