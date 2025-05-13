import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

const STORAGE_KEY = 'bookmarks';

export const getBookmarks = async () => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.error('북마크 가져오기 오류:', e);
    Alert.alert('오류', '북마크를 가져오는 중 문제가 발생했습니다.');
    return [];
  }
};

export const isBookmarked = async place => {
  try {
    const bookmarks = await getBookmarks();
    return bookmarks.some(item => item.id === place.id);
  } catch (e) {
    console.error('북마크 확인 오류:', e);
    return false;
  }
};

export const addBookmark = async place => {
  try {
    const bookmarks = await getBookmarks();
    const exists = bookmarks.some(item => item.id === place.id);
    if (!exists) {
      const updated = [place, ...bookmarks];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      Alert.alert('성공', '북마크에 추가되었습니다.');
    } else {
      Alert.alert('알림', '이미 북마크에 추가된 장소입니다.');
    }
  } catch (e) {
    console.error('북마크 추가 오류:', e);
    Alert.alert('오류', '북마크 추가에 실패했습니다.');
  }
};

export const removeBookmark = async id => {
  try {
    const bookmarks = await getBookmarks();
    const updated = bookmarks.filter(item => item.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    Alert.alert('성공', '북마크에서 삭제되었습니다.');
  } catch (e) {
    console.error('북마크 삭제 오류:', e);
    Alert.alert('오류', '북마크 삭제에 실패했습니다.');
  }
};
