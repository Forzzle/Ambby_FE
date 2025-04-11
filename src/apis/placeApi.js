import axios from './axiosInstance';

export const searchPlaces = async query => {
  try {
    const response = await axios.post('/places/search', {query});
    return response.data;
  } catch (error) {
    console.error('searchPlaces API 오류:', error);
    throw error;
  }
};

export const getDetail = async placeId => {
  try {
    const response = await axios.post(`/places/detail/${placeId}`);
    return response.data;
  } catch (error) {
    console.error('searchPlaces API 오류:', error);
    throw error;
  }
};
