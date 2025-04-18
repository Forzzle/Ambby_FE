import axios from './axiosInstance';

export const searchPlaces = async (query, pageToken = null) => {
  console.log('줄 데이터', pageToken, query);
  try {
    const res = await axios.post(
      '/places/search',
      {query},
      {params: {pageToken}},
    );
    console.log('응답', res.data.data);
    return res.data;
  } catch (error) {
    console.error('searchPlaces API 오류:', error);
    throw error;
  }
};

export const getDetail = async placeId => {
  try {
    const res = await axios.post(`/places/detail/${placeId}`);
    console.log(res);
    return res.data;
  } catch (error) {
    console.error('searchPlaces API 오류:', error);
    throw error;
  }
};
