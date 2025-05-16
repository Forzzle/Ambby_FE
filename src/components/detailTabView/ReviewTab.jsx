import React from 'react';
import {View, StyleSheet} from 'react-native';
import Markdown from 'react-native-markdown-display';
import {useTheme} from '../../contexts/themeContext';

const ReviewInfoView = ({data}) => {
  const {theme} = useTheme();

  if (typeof data !== 'string') {
    return null;
  }

  const styles = getStyles(theme);
  const cleanedMarkdown = data.replace(/^## 리뷰 요약\s*/i, '');

  return (
    <View style={styles.container}>
      <Markdown style={styles.markdown}>{cleanedMarkdown}</Markdown>
    </View>
  );
};

export default ReviewInfoView;

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 10,
      backgroundColor: theme.colors.background,
    },
    markdown: {
      body: {
        color: theme.colors.textPrimary,
        fontSize: 16,
        lineHeight: 20,
      },
    },
  });
