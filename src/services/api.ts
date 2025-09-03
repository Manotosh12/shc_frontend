// api.ts
import axios from 'axios';
import type { FertilizerRecommendationRequest } from '../Fertilizer/Fertilizer';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export { api };

// Soil-related APIs
export const fetchStates = () => api.get('/states');
export const fetchDistrictsByState = (stateId: string) =>
  api.get(`/districts/state/${stateId}`);
export const fetchBlocksByDistrict = (districtId: string) =>
  api.get(`/blocks/district/${districtId}`);

export const fetchDistrictSoilReportByState = (stateId: string) =>
  api.get(`/soil-report-districtwise/state/${stateId}`);
export const fetchBlockSoilReportByDistrict = (districtId: string) =>
  api.get(`/soil-report-blockwise/district/${districtId}`);

export const fetchStateSoilReportPie = (stateId: string) =>
  api.get(`/soil-report-statewise/state/${stateId}`);
export const fetchDistrictSoilReportPie = (districtId: string) =>
  api.get(`/soil-report-districtwise/district/${districtId}`);
export const fetchBlockSoilReportPie = (blockId: string) =>
  api.get(`/soil-report-blockwise/block/${blockId}`);

export const getFertilizerRecommendation = (data: FertilizerRecommendationRequest) =>
  api.post('/recommendation', data);

// ✅ Weather API (fixed)
export const fetchWeatherAdvisory = async (params: {
  state?: string;
  district?: string;
  block?: string;
  lat?: string;
  lon?: string;
}) => {
  const queryParams = new URLSearchParams();
  if (params.state) queryParams.append('state', params.state);
  if (params.district) queryParams.append('district', params.district);
  if (params.block) queryParams.append('block', params.block);
  if (params.lat) queryParams.append('lat', params.lat);
  if (params.lon) queryParams.append('lon', params.lon);

  const url = `/weather/advisory?${queryParams.toString()}`;
  console.log('Weather API Request URL:', api.defaults.baseURL + url);
  console.log('Weather API Request Params:', params);

  const response = await api.get(url);
  return response.data;
};
