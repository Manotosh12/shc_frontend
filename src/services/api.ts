import axios from 'axios';

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