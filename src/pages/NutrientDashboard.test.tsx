import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NutrientDashboard from './NutrientDashboard';
import * as api from '../services/api';

// Mock child components
jest.mock('../components/SoilPieCharts', () => () => <div>SoilPieCharts Component</div>);
jest.mock('../components/SoilReportDashboard', () => () => <div>SoilReportDashboard Component</div>);

// Mock translation
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock API functions
jest.mock('../services/api');

const mockStates = [
  { state_id: '1', state_name: 'State 1' },
  { state_id: '2', state_name: 'State 2' },
];
const mockDistricts = [
  { district_id: '10', district_name: 'District 10' },
  { district_id: '20', district_name: 'District 20' },
];
const mockBlocks = [
  { block_id: '100', block_name: 'Block 100' },
  { block_id: '200', block_name: 'Block 200' },
];

describe('NutrientDashboard', () => {
  beforeEach(() => {
    (api.fetchStates as jest.Mock).mockResolvedValue({ data: mockStates });
    (api.fetchDistrictsByState as jest.Mock).mockResolvedValue({ data: mockDistricts });
    (api.fetchBlocksByDistrict as jest.Mock).mockResolvedValue({ data: mockBlocks });
    jest.clearAllMocks();
  });

  it('renders heading and tab buttons', async () => {
    render(<NutrientDashboard />);
    expect(screen.getByText('nutrient.title')).toBeInTheDocument();
    expect(screen.getByText('tabs.chart')).toBeInTheDocument();
    expect(screen.getByText('tabs.report')).toBeInTheDocument();
    expect(screen.getByText('Export ▼')).toBeInTheDocument();
    await waitFor(() => expect(api.fetchStates).toHaveBeenCalled());
  });

  it('shows export dropdown when export button is clicked', () => {
    render(<NutrientDashboard />);
    fireEvent.click(screen.getByText('Export ▼'));
    expect(screen.getByText('Export JPG')).toBeInTheDocument();
    expect(screen.getByText('Export PDF')).toBeInTheDocument();
  });

  it('renders state dropdown and loads states', async () => {
    render(<NutrientDashboard />);
    await waitFor(() => {
      expect(screen.getByText('State 1')).toBeInTheDocument();
      expect(screen.getByText('State 2')).toBeInTheDocument();
    });
  });

  it('loads districts when a state is selected', async () => {
    render(<NutrientDashboard />);
    await waitFor(() => expect(screen.getByText('State 1')).toBeInTheDocument());
    fireEvent.change(screen.getByDisplayValue('filters.selectState'), { target: { value: '1' } });
    await waitFor(() => {
      expect(api.fetchDistrictsByState).toHaveBeenCalledWith('1');
      expect(screen.getByText('District 10')).toBeInTheDocument();
      expect(screen.getByText('District 20')).toBeInTheDocument();
    });
  });

  it('loads blocks when a district is selected', async () => {
    render(<NutrientDashboard />);
    await waitFor(() => expect(screen.getByText('State 1')).toBeInTheDocument());
    fireEvent.change(screen.getByDisplayValue('filters.selectState'), { target: { value: '1' } });
    await waitFor(() => expect(screen.getByText('District 10')).toBeInTheDocument());
    fireEvent.change(screen.getByDisplayValue('filters.selectDistrict'), { target: { value: '10' } });
    await waitFor(() => {
      expect(api.fetchBlocksByDistrict).toHaveBeenCalledWith('10');
      expect(screen.getByText('Block 100')).toBeInTheDocument();
      expect(screen.getByText('Block 200')).toBeInTheDocument();
    });
  });

  it('shows SoilPieCharts when chart tab is active and selection is made', async () => {
    render(<NutrientDashboard />);
    await waitFor(() => expect(screen.getByText('State 1')).toBeInTheDocument());
    fireEvent.change(screen.getByDisplayValue('filters.selectState'), { target: { value: '1' } });
    await waitFor(() => expect(screen.getByText('District 10')).toBeInTheDocument());
    fireEvent.change(screen.getByDisplayValue('filters.selectDistrict'), { target: { value: '10' } });
    await waitFor(() => expect(screen.getByText('Block 100')).toBeInTheDocument());
    fireEvent.change(screen.getByDisplayValue('filters.selectBlock'), { target: { value: '100' } });
    expect(screen.getByText('SoilPieCharts Component')).toBeInTheDocument();
  });

  it('shows SoilReportDashboard when report tab is active', () => {
    render(<NutrientDashboard />);
    fireEvent.click(screen.getByText('tabs.report'));
    expect(screen.getByText('SoilReportDashboard Component')).toBeInTheDocument();
  });
});