import axios from 'axios';

<<<<<<< HEAD
// Create an axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api', // NestJS default port
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interface for fertilizer recommendation request
export interface FertilizerRecommendationRequest {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicCarbon: number;
  ph: number;
  crop: string;
  area: number;
}

// Interface for fertilizer recommendation response
export interface FertilizerRecommendationResponse {
  recommendations: {
    fertilizer: string;
    quantity: number;
    unit: string;
  }[];
  additionalNotes?: string;
}

// API service functions
export const fertilizerService = {
  getRecommendation: async (data: FertilizerRecommendationRequest): Promise<FertilizerRecommendationResponse> => {
    try {
      const response = await api.post<FertilizerRecommendationResponse>('/fertilizer/recommend', data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to get fertilizer recommendation');
      }
      throw error;
    }
  },
};

export default api; 
=======
const API_BASE = 'http://localhost:3000'; // Adjust to your NestJS backend

export const fetchStates = () => axios.get(`${API_BASE}/states`);
export const fetchDistricts = (stateId: string) => axios.get(`${API_BASE}/districts/state/${stateId}`);
export const fetchBlocks = (districtId: string) => axios.get(`${API_BASE}/blocks/district/${districtId}`);

export const fetchDistrictSoilReport = (stateId: string) => axios.get(`${API_BASE}/soil-report-districtwise/state/${stateId}`);
export const fetchBlockSoilReport = (districtId: string) => axios.get(`${API_BASE}/soil-report-blockwise/district/${districtId}`);
>>>>>>> e0b256df0a4e882e50a7e52e43b5b5c41f8bf376
