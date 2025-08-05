import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // NestJS default port
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});
export { api };

export const fetchStates = () => api.get('/states');
export const fetchDistrictsByState = (stateId: string) => api.get(`/districts/state/${stateId}`);
export const fetchBlocksByDistrict = (districtId: string) => api.get(`/blocks/district/${districtId}`);

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

// Weather API functions
export const fetchWeatherAdvisory = (params: {
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
  console.log('Weather API Request URL:', url);
  console.log('Weather API Request Params:', params);
  
  return api.get(url);
};


