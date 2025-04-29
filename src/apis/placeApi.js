import axios from './axiosInstance';

export const searchPlaces = async (query, pageToken = null) => {
  try {
    const res = await axios.post(
      '/places/search',
      {query},
      {params: {pageToken}},
    );
    return res.data;
  } catch (error) {
    console.error('searchPlaces API 오류:', error);
    throw error;
  }
};

export const getDetail = async placeId => {
  try {
    console.log('id:', placeId);
    const res = await axios.post(`/places/detail/${placeId}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error('searchPlaces API 오류:', error);
    throw error;
  }
};
