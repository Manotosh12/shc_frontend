// import axios from 'axios'; // Make sure axios is imported

// export const fetchWeatherAdvisory = async (params: {
//   state?: string;
//   district?: string;
//   block?: string;
//   lat?: string;
//   lon?: string;
// }) => {
//   const queryParams = new URLSearchParams();
//   if (params.state) queryParams.append('state', params.state);
//   if (params.district) queryParams.append('district', params.district);
//   if (params.block) queryParams.append('block', params.block);
//   if (params.lat) queryParams.append('lat', params.lat);
//   if (params.lon) queryParams.append('lon', params.lon);
  
//   const url = `/weather/advisory?${queryParams.toString()}`;
//   console.log('Weather API Request URL:', url);
//   console.log('Weather API Request Params:', params);
  
//   // Add this line to actually make the API call:
//   const response = await axios.get(url);
//   return response.data; // Return the actual data
// };