import axios from 'axios';

const API_BASE = 'http://localhost:3000'; // Adjust to your NestJS backend

export const fetchStates = () => axios.get(`${API_BASE}/states`);
export const fetchDistricts = (stateId: string) => axios.get(`${API_BASE}/districts/state/${stateId}`);
export const fetchBlocks = (districtId: string) => axios.get(`${API_BASE}/blocks/district/${districtId}`);

export const fetchDistrictSoilReport = (stateId: string) => axios.get(`${API_BASE}/soil-report-districtwise/state/${stateId}`);
export const fetchBlockSoilReport = (districtId: string) => axios.get(`${API_BASE}/soil-report-blockwise/district/${districtId}`);
