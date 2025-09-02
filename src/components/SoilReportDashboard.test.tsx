// SoilReportDashboard.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import SoilReportDashboard from './SoilReportDashboard';
import * as api from '../services/api'; // import all API functions

// Mock the API calls
jest.mock('../services/api', () => ({
  fetchStates: jest.fn(),
  fetchDistrictsByState: jest.fn(),
  fetchBlocksByDistrict: jest.fn(),
  fetchDistrictSoilReportByState: jest.fn(),
  fetchBlockSoilReportByDistrict: jest.fn(),
}));

describe('SoilReportDashboard', () => {
  beforeEach(() => {
    // reset mocks before each test
    jest.resetAllMocks();
  });

  test('renders soil report data correctly', async () => {
    // Mock API responses
    (api.fetchStates as jest.Mock).mockResolvedValue({ data: [{ state_id: '1', state_name: 'State 1' }] });
    (api.fetchDistrictsByState as jest.Mock).mockResolvedValue({ data: [{ district_id: 'd1', district_name: 'District 1' }] });
    (api.fetchDistrictSoilReportByState as jest.Mock).mockResolvedValue({ data: [{ district_name: 'District 1', soil_reports: [] }] });
    (api.fetchBlocksByDistrict as jest.Mock).mockResolvedValue({ data: [{ block_id: 'b1', block_name: 'Block 1' }] });
    (api.fetchBlockSoilReportByDistrict as jest.Mock).mockResolvedValue({ data: [] });

    render(<SoilReportDashboard />);

    // Wait for state dropdown to render
    await waitFor(() => expect(screen.getByText('State 1')).toBeInTheDocument());
  });

  test('handles empty data gracefully', async () => {
    (api.fetchStates as jest.Mock).mockResolvedValue({ data: [] });
    render(<SoilReportDashboard />);

    // Wait for "No data" handling
    await waitFor(() => expect(screen.queryByText('Select a state')).toBeInTheDocument());
  });
});
