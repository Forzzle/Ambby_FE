import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'bookmarks';

export const getBookmarks = async () => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.error('북마크 가져오기 오류:', e);
    return [];
  }
};

export const isBookmarked = async place => {
  const bookmarks = await getBookmarks();
  return bookmarks.some(item => item.id === place.id);
};

export const addBookmark = async place => {
  const bookmarks = await getBookmarks();
  const exists = bookmarks.some(item => item.id === place.id);
  if (!exists) {
    const updated = [place, ...bookmarks]; // 최신순
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
};
export const removeBookmark = async id => {
  const bookmarks = await getBookmarks();
  const updated = bookmarks.filter(item => item.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};
