import axios from './axiosInstance';
export const fetchOptimizedRoute = async places => {
  const response = await axios.post('/places/human-traffic', {
    places,
  });
  return response.data;
};
