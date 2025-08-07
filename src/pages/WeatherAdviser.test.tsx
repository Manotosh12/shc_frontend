import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WeatherAdviser from './WeatherAdviser';

// Mock i18next translation
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, fallback?: string) => fallback || key,
  }),
}));

// Mock API functions
jest.mock('../services/api', () => ({
  fetchWeatherAdvisory: jest.fn(),
  fetchStates: jest.fn(),
  fetchDistrictsByState: jest.fn(),
  fetchBlocksByDistrict: jest.fn(),
}));

import {
  fetchWeatherAdvisory,
  fetchStates,
  fetchDistrictsByState,
  fetchBlocksByDistrict,
} from '../services/api';

describe('WeatherAdviser', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock API responses
    (fetchStates as jest.Mock).mockResolvedValue({
      data: [
        { state_id: '1', state_name: 'State1' },
        { state_id: '2', state_name: 'State2' },
      ],
    });

    (fetchDistrictsByState as jest.Mock).mockResolvedValue({
      data: [{ district_id: '10', district_name: 'District1' }],
    });

    (fetchBlocksByDistrict as jest.Mock).mockResolvedValue({
      data: [{ block_id: '100', block_name: 'Block1' }],
    });

    // ✅ Safely mock navigator.geolocation (read-only)
    Object.defineProperty(global.navigator, 'geolocation', {
      value: {
        getCurrentPosition: jest.fn().mockImplementation((success) => {
          success({ coords: { latitude: 12.34, longitude: 56.78 } });
        }),
      },
      configurable: true,
    });
  });

  test('renders WeatherAdviser main UI', async () => {
    render(<WeatherAdviser />);
    expect(screen.getByText(/weather adviser/i)).toBeInTheDocument();
    expect(screen.getByText(/location selection/i)).toBeInTheDocument();
    expect(screen.getByText(/current location/i)).toBeInTheDocument();
    expect(screen.getByText(/manual selection/i)).toBeInTheDocument();
    await waitFor(() => expect(fetchStates).toHaveBeenCalled());
  });

  test('shows manual location dropdowns and fetches districts/blocks', async () => {
    render(<WeatherAdviser />);
    fireEvent.click(screen.getByText(/manual selection/i));
    await waitFor(() => expect(fetchStates).toHaveBeenCalled());

    const selects = screen.getAllByRole('combobox');

    // Select state
    fireEvent.change(selects[0], { target: { value: 'State1' } });
    await waitFor(() => expect(fetchDistrictsByState).toHaveBeenCalled());

    // Select district
    fireEvent.change(selects[1], { target: { value: 'District1' } });
    await waitFor(() => expect(fetchBlocksByDistrict).toHaveBeenCalled());

    // Select block
    fireEvent.change(selects[2], { target: { value: 'Block1' } });
  });

  test('fetches and displays weather data', async () => {
    (fetchWeatherAdvisory as jest.Mock).mockResolvedValue({
      data: {
        location: {
          name: 'Test City',
          region: 'Test Region',
          country: 'Test Country',
        },
        forecast: [
          {
            date: '2024-06-01',
            condition: 'Sunny',
            avgtemp_c: 30,
            humidity: 50,
            wind_kph: 10,
            chance_of_rain: 20,
            advisory: 'Test advisory',
          },
        ],
      },
    });

    render(<WeatherAdviser />);
    const button = screen.getByRole('button', { name: /get weather forecast/i });
    fireEvent.click(button);

    await waitFor(() => expect(fetchWeatherAdvisory).toHaveBeenCalled());
    expect(await screen.findByText(/test city/i)).toBeInTheDocument();
    expect(screen.getByText(/test advisory/i)).toBeInTheDocument();
  });

  test('shows error message on API error', async () => {
    (fetchWeatherAdvisory as jest.Mock).mockRejectedValue({
      message: 'Failed to fetch weather data',
    });

    render(<WeatherAdviser />);
    const button = screen.getByRole('button', { name: /get weather forecast/i });
    fireEvent.click(button);

    expect(await screen.findByText(/failed to fetch weather data/i)).toBeInTheDocument();
  });
});
