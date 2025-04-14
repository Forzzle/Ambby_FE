import React from 'react';
import {View, StyleSheet} from 'react-native';
import Markdown from 'react-native-markdown-display';
import {useTheme} from '../../contexts/themeContext';

const ReviewInfoView = ({reviewInfo}) => {
  const {theme} = useTheme();

  if (typeof reviewInfo !== 'string') {
    return null;
  }

  const cleanedMarkdown = reviewInfo.replace(/^## 리뷰 요약\s*/i, '');

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Markdown
        style={{
          body: {color: theme.colors.text},
          paragraph: {color: theme.colors.text},
          heading2: {color: theme.colors.text},
          heading3: {color: theme.colors.text},
        }}>
        {cleanedMarkdown}
      </Markdown>
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
    //backgroundColor: 'lightgrey',
  },
});
