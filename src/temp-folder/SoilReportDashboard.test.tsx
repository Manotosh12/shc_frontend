import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SoilReportDashboard from './SoilReportDashboard';
import * as api from '../services/api';

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

const mockDistrictReports = [
  {
    district_name: 'District 10',
    soil_reports: [
      {
        n: { High: 10, Medium: 20, Low: 30 },
        p: { High: 5, Medium: 15, Low: 25 },
        k: { High: 8, Medium: 12, Low: 18 },
        OC: { High: 2, Medium: 4, Low: 6 },
        pH: { Acidic: 3, Neutral: 7, Alkaline: 10 },
        timestamp: '2024-01-01',
      },
    ],
  },
];

const mockBlockReports = [
  {
    block_name: 'Block 100',
    soil_reports: [
      {
        n: { High: 1, Medium: 2, Low: 3 },
        p: { High: 4, Medium: 5, Low: 6 },
        k: { High: 7, Medium: 8, Low: 9 },
        OC: { High: 10, Medium: 11, Low: 12 },
        pH: { Acidic: 13, Neutral: 14, Alkaline: 15 },
        timestamp: '2024-01-02',
      },
    ],
  },
];

describe('SoilReportDashboard', () => {
  beforeEach(() => {
    (api.fetchStates as jest.Mock).mockResolvedValue({ data: mockStates });
    (api.fetchDistrictsByState as jest.Mock).mockResolvedValue({ data: mockDistricts });
    (api.fetchBlocksByDistrict as jest.Mock).mockResolvedValue({ data: mockBlocks });
    (api.fetchDistrictSoilReportByState as jest.Mock).mockResolvedValue({ data: mockDistrictReports });
    (api.fetchBlockSoilReportByDistrict as jest.Mock).mockResolvedValue({ data: mockBlockReports });
    jest.clearAllMocks();
  });

  it('renders state dropdown and loads states', async () => {
    render(<SoilReportDashboard />);
    await waitFor(() => {
      expect(screen.getByText('State 1')).toBeInTheDocument();
      expect(screen.getByText('State 2')).toBeInTheDocument();
    });
  });

  it('loads districts and district reports when a state is selected', async () => {
    render(<SoilReportDashboard />);
    await waitFor(() => expect(screen.getByText('State 1')).toBeInTheDocument());

    fireEvent.change(screen.getByDisplayValue('Select a state'), {
      target: { value: '1' },
    });

    await waitFor(() => {
      expect(api.fetchDistrictsByState).toHaveBeenCalledWith('1');
      expect(api.fetchDistrictSoilReportByState).toHaveBeenCalledWith('1');

      const districtOptions = screen.getAllByText('District 10');
      expect(districtOptions.length).toBeGreaterThan(0);

      // Check percentage from soil report
      const nitrogenHigh = screen.getAllByText('33.33%');
      expect(nitrogenHigh.length).toBeGreaterThan(0);
    });
  });

  it('loads blocks and block reports when a district is selected', async () => {
    render(<SoilReportDashboard />);
    await waitFor(() => expect(screen.getByText('State 1')).toBeInTheDocument());

    fireEvent.change(screen.getByDisplayValue('Select a state'), {
      target: { value: '1' },
    });

    await waitFor(() => {
      expect(screen.getAllByText('District 10').length).toBeGreaterThan(0);
    });

    fireEvent.change(screen.getByDisplayValue('Select a district'), {
      target: { value: '10' },
    });

    await waitFor(() => {
      expect(api.fetchBlocksByDistrict).toHaveBeenCalledWith('10');
      expect(api.fetchBlockSoilReportByDistrict).toHaveBeenCalledWith('10');

      // Use getAllByText to avoid dropdown + table conflict
      const blockItems = screen.getAllByText('Block 100');
      expect(blockItems.length).toBeGreaterThan(0);

      const percent = screen.getAllByText('16.67%');
      expect(percent.length).toBeGreaterThan(0);
    });
  });

  it('renders the table headers', async () => {
    render(<SoilReportDashboard />);
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('Nitrogen')).toBeInTheDocument();
    expect(screen.getByText('Phosphorous')).toBeInTheDocument();
    expect(screen.getByText('Potassium')).toBeInTheDocument();
    expect(screen.getByText('OC')).toBeInTheDocument();
    expect(screen.getByText('pH Level')).toBeInTheDocument();
  });
});
