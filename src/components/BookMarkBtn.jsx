import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  addBookmark,
  isBookmarked,
  removeBookmark,
} from '../utils/bookMarkStorage';
import {useTheme} from '../contexts/themeContext';

const BookMarkBtn = ({place, size = 24}) => {
  const [bookmarked, setBookmarked] = useState(false);
  const {theme} = useTheme();

  useEffect(() => {
    const checkBookmark = async () => {
      const isMarked = await isBookmarked(place);
      setBookmarked(isMarked);
    };
    checkBookmark();
  }, [place]);

  const toggleBookmark = async () => {
    if (bookmarked) {
      await removeBookmark(place);
    } else {
      await addBookmark(place);
    }
    setBookmarked(!bookmarked);
  };

  return (
    <TouchableOpacity
      onPress={toggleBookmark}
      accessibilityRole="button"
      accessibilityLabel={bookmarked ? '북마크 제거 버튼' : '북마크 추가 버튼'}
      accessibilityHint={
        bookmarked
          ? '이 장소의 북마크를 제거합니다.'
          : '이 장소를 북마크에 추가합니다.'
      }>
      <Icon
        name={bookmarked ? 'bookmark' : 'bookmark-border'}
        size={size}
        color={theme.colors.secondary}
        accessibilityLabel={
          bookmarked ? '북마크가 추가된 아이콘' : '북마크가 없는 아이콘'
        }
      />
    </TouchableOpacity>
  );
};

export default BookMarkBtn;
