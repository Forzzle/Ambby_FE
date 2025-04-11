import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ReviewInfoView = ({reviewInfo}) => {
  console.log(reviewInfo);
  return (
    <View style={styles.container}>
      <Text>{reviewInfo}</Text>
      {reviewInfo?.advantages && (
        <View>
          <Text style={styles.title}>장점</Text>
          <Text style={styles.content}>{reviewInfo.advantages}</Text>
        </View>
      )}
      {reviewInfo?.disadvantages && (
        <View>
          <Text style={styles.title}>단점</Text>
          <Text style={styles.content}>{reviewInfo.disadvantages}</Text>
        </View>
      )}
      {reviewInfo?.accessibility && (
        <View>
          <Text style={styles.title}>편의시설</Text>
          <Text style={styles.content}>{reviewInfo.accessibility}</Text>
        </View>
      )}
    </View>
  );
};

export default ReviewInfoView;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16,
    backgroundColor: 'lightgrey',
  },
  title: {
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    color: '#555',
  },
});
