import axios from './axiosInstance';

export const fetchOptimizedRoute = async placeIds => {
  const response = await axios.post('/route/optimize', {placeIds});
  return response.data;
};
