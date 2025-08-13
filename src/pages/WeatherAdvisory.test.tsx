import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeatherAdvisory from './WeatherAdvisory';
import { fetchStates, fetchWeatherAdvisory } from '../services/api';

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((msg: unknown) => {
    if (
      typeof msg === 'string' &&
      msg.includes('not wrapped in act')
    ) {
      return;
    }
    // @ts-expect-error: mockRestore is not typed on console.error but is available after jest.spyOn
    console.error.mockRestore();
  });
});

afterAll(() => {
  // @ts-expect-error: mockRestore is not typed on console.error but is available after jest.spyOn
  console.error.mockRestore();
});

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, fallback?: string) => {
      // Return fallback if provided, else return a simple mapping for test
      const translations: Record<string, string> = {
        'weather.manualLocation': 'Manual Location',
        'weather.getForecast': 'Get Forecast',
        'weather.description': 'Weather description',
      };
      return fallback || translations[key] || key;
    },
  }),
}));

jest.mock('../services/api', () => ({
  fetchWeatherAdvisory: jest.fn(),
  fetchStates: jest.fn(),
  fetchDistrictsByState: jest.fn(),
  fetchBlocksByDistrict: jest.fn(),
}));

const mockGeolocation = {
  getCurrentPosition: jest.fn(),
};
(global.navigator as unknown as { geolocation: typeof mockGeolocation }).geolocation = mockGeolocation;

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
    // Find the manual location button by its text
    const manualLocationButton = screen.getByRole('button', { name: /Manual Location/i });
    fireEvent.click(manualLocationButton);
    expect(await screen.findByText('State1')).toBeInTheDocument();
  });

  it('fetches weather for current location', async () => {
    mockGeolocation.getCurrentPosition.mockImplementationOnce((success) =>
      success({ coords: { latitude: 12.34, longitude: 56.78 } })
    );

    (fetchWeatherAdvisory as jest.Mock).mockResolvedValueOnce({
      data: {
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
      },
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

    expect(await screen.findByText(/Test City/)).toBeInTheDocument();
    expect(await screen.findByText(/Test advisory/)).toBeInTheDocument();
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