import React from 'react';
import {View, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../contexts/themeContext';

const RatingStars = ({rating = 0}) => {
  const {theme} = useTheme();
  const maxStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  const starColor = theme.colors.secondary || '#FFD700';

  return (
    <View style={styles.row}>
      {Array(fullStars)
        .fill()
        .map((_, i) => (
          <Ionicons key={`full-${i}`} name="star" size={16} color={starColor} />
        ))}
      {hasHalfStar && <Ionicons name="star-half" size={16} color={starColor} />}

      {Array(emptyStars)
        .fill()
        .map((_, i) => (
          <Ionicons
            key={`empty-${i}`}
            name="star-outline"
            size={16}
            color={starColor}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default RatingStars;
