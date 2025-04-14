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

export const isBookmarked = async id => {
  const bookmarks = await getBookmarks();
  return bookmarks.includes(id);
};

export const addBookmark = async id => {
  const bookmarks = await getBookmarks();
  if (!bookmarks.includes(id)) {
    bookmarks.push(id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }
};

export const removeBookmark = async id => {
  const bookmarks = await getBookmarks();
  const updated = bookmarks.filter(item => item !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

//아이콘 변경
export const toggleBookmark = async id => {
  const bookmarked = await isBookmarked(id);
  if (bookmarked) {
    await removeBookmark(id);
  } else {
    await addBookmark(id);
  }
  return !bookmarked;
};
