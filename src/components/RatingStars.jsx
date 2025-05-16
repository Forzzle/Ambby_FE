import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {useTheme} from '../contexts/themeContext';
import icons from '../constants/icons';

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
          <Image
            key={`full-${i}`}
            source={icons.starFill}
            style={[styles.star, {tintColor: starColor}]}
          />
        ))}
      {hasHalfStar && (
        <Image
          source={icons.starHalf}
          style={[styles.star, {tintColor: starColor}]}
          key="half"
        />
      )}
      {Array(emptyStars)
        .fill()
        .map((_, i) => (
          <Image
            key={`empty-${i}`}
            source={icons.starOutline}
            style={[styles.star, {tintColor: starColor}]}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 4,
  },
  star: {
    width: 16,
    height: 16,
  },
});

export default RatingStars;
