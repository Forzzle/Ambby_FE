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
    <TouchableOpacity onPress={toggleBookmark}>
      <Icon
        name={bookmarked ? 'bookmark' : 'bookmark-border'}
        size={size}
        color={theme.colors.secondary}
      />
    </TouchableOpacity>
  );
};

export default BookMarkBtn;
