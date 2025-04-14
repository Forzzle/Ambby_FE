import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  addBookmark,
  removeBookmark,
  isBookmarked,
} from '../utils/bookMarkStorage';

const BookmarkButton = ({placeId, size = 20}) => {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const checkBookmark = async () => {
      const isMarked = await isBookmarked(placeId);
      setBookmarked(isMarked);
    };
    checkBookmark();
  }, [placeId]);

  const toggleBookmark = async () => {
    if (bookmarked) {
      await removeBookmark(placeId);
    } else {
      await addBookmark(placeId);
    }
    setBookmarked(!bookmarked);
  };

  return (
    <TouchableOpacity onPress={toggleBookmark}>
      <Icon name={bookmarked ? 'bookmark' : 'bookmark-border'} size={size} />
    </TouchableOpacity>
  );
};

export default BookmarkButton;
