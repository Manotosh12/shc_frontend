import axios from 'axios';
import type { FertilizerRecommendationRequest } from '../fertilizer';

const api = axios.create({
  baseURL: 'https://soil-health-card-tz26.onrender.com',
});
export { api };


// API Endpoints
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

export const getFertilizerRecommendation = (data: FertilizerRecommendationRequest) =>
  api.post('/recommendation', data);
