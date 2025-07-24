import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import SoilPieCharts from './SoilPieCharts';
import * as api from '../services/api';

// Mock PieChart and useTranslation
jest.mock('@mui/x-charts', () => ({
  PieChart: (props: any) => <div data-testid="pie-chart">{JSON.stringify(props.series)}</div>,
}));
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock API functions
const mockStateData = [{
  n: { Low: 10, Medium: 20, High: 30 },
  p: { Low: 5, Medium: 15, High: 25 },
  k: { Low: 8, Medium: 12, High: 18 },
  OC: { Low: 2, Medium: 4, High: 6 },
  pH: { Acidic: 3, Neutral: 7, Alkaline: 10 },
}];

describe('SoilPieCharts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (api.fetchStateSoilReportPie as jest.Mock) = jest.fn().mockResolvedValue({ data: mockStateData });
    (api.fetchDistrictSoilReportPie as jest.Mock) = jest.fn().mockResolvedValue({ data: mockStateData });
    (api.fetchBlockSoilReportPie as jest.Mock) = jest.fn().mockResolvedValue({ data: mockStateData });
  });

  it('renders loading initially', () => {
    render(<SoilPieCharts level="state" id="1" />);
    expect(screen.getByText('charts.loading')).toBeInTheDocument();
  });

  it('fetches and displays pie charts for state level', async () => {
    await act(async () => {
      render(<SoilPieCharts level="state" id="1" />);
    });

    await waitFor(() => {
      expect(api.fetchStateSoilReportPie).toHaveBeenCalledWith('1');
      expect(screen.getAllByTestId('pie-chart').length).toBeGreaterThan(0);
      expect(screen.getByText('N')).toBeInTheDocument();
      expect(screen.getByText('P')).toBeInTheDocument();
      expect(screen.getByText('K')).toBeInTheDocument();
      expect(screen.getByText('OC')).toBeInTheDocument();
      expect(screen.getByText('PH')).toBeInTheDocument();
    });
  });

  it('fetches and displays pie charts for district level', async () => {
    await act(async () => {
      render(<SoilPieCharts level="district" id="2" />);
    });

    await waitFor(() => {
      expect(api.fetchDistrictSoilReportPie).toHaveBeenCalledWith('2');
      expect(screen.getAllByTestId('pie-chart').length).toBeGreaterThan(0);
    });
  });

  it('fetches and displays pie charts for block level', async () => {
    await act(async () => {
      render(<SoilPieCharts level="block" id="3" />);
    });

    await waitFor(() => {
      expect(api.fetchBlockSoilReportPie).toHaveBeenCalledWith('3');
      expect(screen.getAllByTestId('pie-chart').length).toBeGreaterThan(0);
    });
  });
});
