import React from 'react';
import {View, StyleSheet} from 'react-native';
import Markdown from 'react-native-markdown-display';

const ReviewInfoView = ({reviewInfo}) => {
  if (typeof reviewInfo !== 'string') {
    return null;
  }

  const cleanedMarkdown = reviewInfo.replace(/^## 리뷰 요약\s*/i, '');

  return (
    <View style={styles.container}>
      <Markdown>{cleanedMarkdown}</Markdown>
    </View>
  );
};

export default ReviewInfoView;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    gap: 16,
    backgroundColor: 'lightgrey',
  },
});
