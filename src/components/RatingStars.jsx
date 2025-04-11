import React from 'react';
import {View, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RatingStars = ({rating = 0, reviewCount = 0}) => {
  const maxStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <View style={styles.row}>
      {Array(fullStars)
        .fill()
        .map((_, i) => (
          <Ionicons key={`full-${i}`} name="star" size={16} color="#FFD700" />
        ))}
      {hasHalfStar && <Ionicons name="star-half" size={16} color="#FFD700" />}

      {Array(emptyStars)
        .fill()
        .map((_, i) => (
          <Ionicons
            key={`empty-${i}`}
            name="star-outline"
            size={16}
            color="#FFD700"
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
