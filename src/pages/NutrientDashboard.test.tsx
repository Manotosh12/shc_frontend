import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import NutrientDashboard from './NutrientDashboard';
import * as api from '../services/api';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'nutrient.title': 'Nutrient Dashboard',
        'tabs.chart': 'Charts',
        'tabs.report': 'Soil Report',
        'filters.selectState': 'Select State',
        'filters.selectDistrict': 'Select District',
        'filters.selectBlock': 'Select Block'
      };
      return translations[key] || key;
    },
  }),
}));

jest.mock('../services/api');

describe('NutrientDashboard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders NutrientDashboard and switches tabs', async () => {
    (api.fetchStates as jest.Mock).mockResolvedValue({
      data: [
        { state_id: '1', state_name: 'State A' },
        { state_id: '2', state_name: 'State B' },
      ],
    });

    render(<NutrientDashboard />);

    // Title check
    expect(screen.getByText('Nutrient Dashboard')).toBeInTheDocument();

    // State dropdown
    await waitFor(() => {
      expect(screen.getByText('Select State')).toBeInTheDocument();
    });

    // Simulate switching tab
    fireEvent.click(screen.getByText('Soil Report'));
    expect(screen.getByText('Soil Report')).toBeInTheDocument();

    // Switch back
    fireEvent.click(screen.getByText('Charts'));
    expect(screen.getByText('Charts')).toBeInTheDocument();
  });
});
