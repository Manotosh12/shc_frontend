import axios from 'axios';

const API_BASE = 'http://localhost:3000'; // Adjust to your NestJS backend

export const fetchStates = () => axios.get(`${API_BASE}/states`);
export const fetchDistrictsByState = (stateId: string) => axios.get(`${API_BASE}/districts/state/${stateId}`);
export const fetchBlocksByDistrict = (districtId: string) => axios.get(`${API_BASE}/blocks/district/${districtId}`);

export const fetchDistrictSoilReportByState = (stateId: string) => axios.get(`${API_BASE}/soil-report-districtwise/state/${stateId}`);
export const fetchBlockSoilReportByDistrict = (districtId: string) => axios.get(`${API_BASE}/soil-report-blockwise/district/${districtId}`);


// ✅ Fetch state-level soil report by state ID
export const fetchStateSoilReportPie = (stateId: string) =>
  axios.get(`${API_BASE}/soil-report-statewise/state/${stateId}`);

// ✅ Fetch district-level soil report by district ID
export const fetchDistrictSoilReportPie = (districtId: string) =>
  axios.get(`${API_BASE}/soil-report-districtwise/district/${districtId}`);

// ✅ Fetch block-level soil report by block ID
export const fetchBlockSoilReportPie = (blockId: string) =>
  axios.get(`${API_BASE}/soil-report-blockwise/block/${blockId}`);