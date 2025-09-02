import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {  fetchStates, fetchDistrictsByState, fetchBlocksByDistrict, fetchWeatherAdvisory } from '../services/api';


interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
  };
  forecast: Array<{
    date: string;
    condition: string;
    avgtemp_c: number;
    humidity: number;
    wind_kph: number;
    chance_of_rain: number;
    advisory: string;
  }>;
}

interface LocationOption {
  id: string;
  name: string;
}

interface StateResponse {
  state_id: string;
  state_name: string;
}

interface DistrictResponse {
  district_id: string;
  district_name: string;
}

interface BlockResponse {
  block_id: string;
  block_name: string;
}

interface WeatherParams {
  lat?: string;
  lon?: string;
  state?: string;
  district?: string;
  block?: string;
}

interface ApiError {
  message: string;
  response?: {
    status: number;
    statusText: string;
    data?: {
      message?: string;
    };
  };
  config?: {
    url: string;
    method: string;
    headers: Record<string, string>;
  };
}

const WeatherAdvisory: React.FC = () => {
  const { t } = useTranslation();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locationMethod, setLocationMethod] = useState<'current' | 'manual'>('current');
  
  // Manual location states
  const [states, setStates] = useState<LocationOption[]>([]);
  const [districts, setDistricts] = useState<LocationOption[]>([]);
  const [blocks, setBlocks] = useState<LocationOption[]>([]);
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedBlock, setSelectedBlock] = useState<string>('');

  useEffect(() => {
    const loadStates = async () => {
      try {
        const response = await fetchStates();
        const transformedStates = response.data.map((state: StateResponse) => ({
          id: state.state_id,
          name: state.state_name
        }));
        setStates(transformedStates);
      } catch (err) {
        console.error(t('weather.error', 'Error'), err);
      }
    };
    loadStates();
  }, [t]);

  useEffect(() => {
    if (selectedState) {
      const loadDistricts = async () => {
        try {
          const stateObj = states.find(s => s.name === selectedState);
          if (stateObj) {
            const response = await fetchDistrictsByState(stateObj.id);
            const transformedDistricts = response.data.map((district: DistrictResponse) => ({
              id: district.district_id,
              name: district.district_name
            }));
            setDistricts(transformedDistricts);
          } else {
            console.error(t('weather.error', 'Error'), t('filters.selectState', 'Select State'));
          }
          setSelectedDistrict('');
          setSelectedBlock('');
          setBlocks([]);
        } catch (err) {
          console.error(t('weather.error', 'Error'), err);
        }
      };
      loadDistricts();
    }
  }, [selectedState, states, t]);

  useEffect(() => {
    if (selectedDistrict) {
      const loadBlocks = async () => {
        try {
          const districtObj = districts.find(d => d.name === selectedDistrict);
          if (districtObj) {
            const response = await fetchBlocksByDistrict(districtObj.id);
            const transformedBlocks = response.data.map((block: BlockResponse) => ({
              id: block.block_id,
              name: block.block_name
            }));
            setBlocks(transformedBlocks);
          } else {
            console.error(t('weather.error', 'Error'), t('filters.selectDistrict', 'Select District'));
          }
          setSelectedBlock('');
        } catch (err) {
          console.error(t('weather.error', 'Error'), err);
        }
      };
      loadBlocks();
    }
  }, [selectedDistrict, districts, t]);

  const getCurrentLocation = (): Promise<{ lat: number; lon: number }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error(t('weather.error', 'Error') + ': Geolocation is not supported by this browser.'));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        () => {
          reject(new Error(t('weather.error', 'Error') + ': Unable to retrieve your location.'));
        }
      );
    });
  };

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const params: WeatherParams = {};

      if (locationMethod === 'current') {
        const coords = await getCurrentLocation();
        params.lat = coords.lat.toString();
        params.lon = coords.lon.toString();
      } else {
        if (!selectedState) {
          throw new Error(t('filters.selectState', 'Please select a state'));
        }
        params.state = selectedState;
        if (selectedDistrict) params.district = selectedDistrict;
        if (selectedBlock) params.block = selectedBlock;
      }

      const response = await fetchWeatherAdvisory(params);
      setWeatherData(response);
    } catch (err) {
      const apiError = err as ApiError;
      if (apiError.response?.status === 404) {
        setError(t('weather.error', 'Weather service endpoint not found. Please check if the weather module is deployed.'));
      } else if (apiError.response?.status === 500) {
        setError(t('weather.error', 'Weather service internal error. Please try again later.'));
      } else if (apiError.response?.status === 403) {
        setError(t('weather.error', 'Access denied. Please check authentication.'));
      } else {
        setError(apiError.response?.data?.message || apiError.message || t('weather.error', 'Failed to fetch weather data'));
      }
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) return '☀️';
    if (conditionLower.includes('cloudy') || conditionLower.includes('overcast')) return '☁️';
    if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) return '🌧️';
    if (conditionLower.includes('snow')) return '❄️';
    if (conditionLower.includes('thunder')) return '⛈️';
    if (conditionLower.includes('fog') || conditionLower.includes('mist')) return '🌫️';
    return '🌤️';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🌤️ {t('weather.title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('weather.description')}
          </p>
        </div>

        {/* Location Selection */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            📍 {t('weather.locationSelection')}
          </h2>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <button
              onClick={() => setLocationMethod('current')}
              className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                locationMethod === 'current'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-blue-300'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">📍</div>
                <div className="font-semibold">{t('weather.currentLocation')}</div>
                <div className="text-sm text-gray-600">{t('weather.currentLocationDesc')}</div>
              </div>
            </button>

            <button
              onClick={() => setLocationMethod('manual')}
              className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                locationMethod === 'manual'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-blue-300'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">🏛️</div>
                <div className="font-semibold">{t('weather.manualLocation')}</div>
                <div className="text-sm text-gray-600">{t('weather.manualLocationDesc')}</div>
              </div>
            </button>
          </div>

          {locationMethod === 'manual' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('filters.selectState')} *
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">{t('filters.selectState')}</option>
                  {states.map((state) => (
                    <option key={state.id} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('filters.selectDistrict')}
                </label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={!selectedState}
                >
                  <option value="">{t('filters.selectDistrict')}</option>
                  {districts.map((district) => (
                    <option key={district.id} value={district.name}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('filters.selectBlock')}
                </label>
                <select
                  value={selectedBlock}
                  onChange={(e) => setSelectedBlock(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={!selectedDistrict}
                >
                  <option value="">{t('filters.selectBlock')}</option>
                  {blocks.map((block) => (
                    <option key={block.id} value={block.name}>
                      {block.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <button
            onClick={fetchWeather}
            disabled={loading || (locationMethod === 'manual' && !selectedState)}
            className="mt-6 w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {t('weather.loading')}
              </span>
            ) : (
              t('weather.getForecast')
            )}
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="text-red-400 text-xl mr-3">⚠️</div>
              <div>
                <h3 className="text-red-800 font-semibold">{t('weather.error')}</h3>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Weather Data Display */}
        {weatherData && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                📍 {weatherData.location.name}, {weatherData.location.region}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {weatherData.forecast.map((day, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
                    <div className="text-center">
                      <div className="text-3xl mb-2">{getWeatherIcon(day.condition)}</div>
                      <h3 className="font-semibold text-lg">{formatDate(day.date)}</h3>
                      <p className="text-blue-100">{day.condition}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">{day.avgtemp_c}°C</div>
                        <div className="text-sm text-gray-600">{t('weather.temperature')}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">{day.humidity}%</div>
                        <div className="text-sm text-gray-600">{t('weather.humidity')}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">{day.wind_kph} km/h</div>
                        <div className="text-sm text-gray-600">{t('weather.wind')}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">{day.chance_of_rain}%</div>
                        <div className="text-sm text-gray-600">{t('weather.rainChance')}</div>
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        🌾 {t('weather.advisory')}
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed">{day.advisory}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherAdvisory;
