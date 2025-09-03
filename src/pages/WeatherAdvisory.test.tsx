import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeatherAdvisory from './WeatherAdvisory';
import { fetchStates } from '../services/api';
import { fetchWeatherAdvisory } from '../services/api';

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((msg: unknown) => {
    if (typeof msg === 'string' && msg.includes('not wrapped in act')) {
      return;
    }
  });
});

afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, fallback?: string) => {
      const translations: Record<string, string> = {
        'weather.manualLocation': 'Manual Location',
        
        'weather.description': 'Weather description',
        'weather.title': 'Weather Title',
        'weather.locationSelection': 'Location Selection',
        'weather.currentLocation': 'Current Location',
        'weather.currentLocationDesc': 'Current Location Description',
        'weather.manualLocationDesc': 'Manual Location Description',
        'weather.advisory': 'Advisory',
        'weather.error': 'Error',
        'weather.loading': 'Loading...',
        'weather.getForecast': 'Get Forecast',
      };
      return fallback || translations[key] || key;
    },
  }),
}));

jest.mock('../services/api', () => ({
  fetchStates: jest.fn(),
  fetchDistrictsByState: jest.fn(),
  fetchBlocksByDistrict: jest.fn(),
  fetchWeatherAdvisory: jest.fn(),
}));

const mockGeolocation = {
  getCurrentPosition: jest.fn(),
};
(global.navigator as unknown as { geolocation: typeof mockGeolocation }).geolocation =
  mockGeolocation;

describe('WeatherAdvisory Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fetchStates as jest.Mock).mockResolvedValue({
      data: [{ state_id: '1', state_name: 'State1' }],
    });
  });

  it('renders header and description', () => {
    render(<WeatherAdvisory />);
    expect(screen.getByText(/🌤️/)).toBeInTheDocument();
    expect(screen.getByText(/Weather description/i)).toBeInTheDocument();
  });

  it('loads states on manual location selection', async () => {
    render(<WeatherAdvisory />);
    const manualLocationButton = screen.getByRole('button', { name: /Manual Location/i });
    fireEvent.click(manualLocationButton);
    expect(await screen.findByText('State1')).toBeInTheDocument();
  });

  it('fetches weather for current location', async () => {
    mockGeolocation.getCurrentPosition.mockImplementationOnce((success) =>
      success({ coords: { latitude: 12.34, longitude: 56.78 } })
    );

    (fetchWeatherAdvisory as jest.Mock).mockResolvedValueOnce({
      location: { name: 'Test City', region: 'Test Region', country: 'Test Country' },
      forecast: [
        {
          date: '2025-08-13',
          condition: 'Sunny',
          avgtemp_c: 30,
          humidity: 50,
          wind_kph: 10,
          chance_of_rain: 20,
          advisory: 'Test advisory',
        },
      ],
    });

    render(<WeatherAdvisory />);

    const button = screen.getByRole('button', { name: /Get Forecast/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(fetchWeatherAdvisory).toHaveBeenCalledWith({
        lat: '12.34',
        lon: '56.78',
      });
    });

    // Wait for the "Test City" to appear. Using a more specific selector.
    await screen.findByText(/Test City/);

    // Now assert that the advisory is present
    expect(screen.getByText(/Test advisory/)).toBeInTheDocument();
  });

  it('shows error message on API failure', async () => {
    mockGeolocation.getCurrentPosition.mockImplementationOnce((success) =>
      success({ coords: { latitude: 12.34, longitude: 56.78 } })
    );

    (fetchWeatherAdvisory as jest.Mock).mockRejectedValueOnce({
      message: 'API Error',
    });

    render(<WeatherAdvisory />);

    const button = screen.getByRole('button', { name: /Get Forecast/i });
    fireEvent.click(button);

    expect(await screen.findByText(/API Error/)).toBeInTheDocument();
  });
});