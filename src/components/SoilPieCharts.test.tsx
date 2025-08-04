// src/components/SoilPieCharts.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import SoilPieCharts from './SoilPieCharts';
import * as api from '../services/api';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('@mui/x-charts', () => ({
  __esModule: true,
  PieChart: ({ series }: { series: unknown }) => (
    <div data-testid="pie-chart">{JSON.stringify(series)}</div>
  ),
}));

// Mock API functions
jest.mock('../services/api', () => ({
  fetchStateSoilReportPie: jest.fn(),
  fetchDistrictSoilReportPie: jest.fn(),
  fetchBlockSoilReportPie: jest.fn(),
}));

const mockData = [
  {
    n: { Low: 20, Medium: 30, High: 50 },
    p: { Low: 10, Medium: 40, High: 50 },
    k: { Low: 15, Medium: 35, High: 50 },
    OC: { Low: 25, Medium: 25, High: 50 },
    pH: { Acidic: 20, Neutral: 40, Alkaline: 40 },
  },
];

describe('SoilPieCharts Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders pie charts for state level', async () => {
    (api.fetchStateSoilReportPie as jest.Mock).mockResolvedValueOnce({
      data: mockData,
    });

    render(<SoilPieCharts level="state" id="123" />);

    expect(screen.getByText('charts.loading')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByTestId('pie-chart').length).toBe(5); // 5 nutrients
    });
  });

  test('renders pie charts for district level', async () => {
    (api.fetchDistrictSoilReportPie as jest.Mock).mockResolvedValueOnce({
      data: mockData,
    });

    render(<SoilPieCharts level="district" id="456" />);

    await waitFor(() => {
      expect(screen.getAllByTestId('pie-chart').length).toBe(5);
    });
  });

  test('renders pie charts for block level', async () => {
    (api.fetchBlockSoilReportPie as jest.Mock).mockResolvedValueOnce({
      data: mockData,
    });

    render(<SoilPieCharts level="block" id="789" />);

    await waitFor(() => {
      expect(screen.getAllByTestId('pie-chart').length).toBe(5);
    });
  });
});
