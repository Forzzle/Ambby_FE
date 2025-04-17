import axios from './axiosInstance';

export const searchPlaces = async (prompt, pageToken = null) => {
  try {
    const response = await axios.post(
      `/places/search${pageToken ? `?pageToken=${pageToken}` : ''}`,
      prompt,
      {headers: {'Content-Type': 'application/json'}},
    );
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
