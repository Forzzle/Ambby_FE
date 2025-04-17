import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import icons from '../constants/icons';
import {useTheme} from '../contexts/themeContext';

const Loading = () => {
  const {theme} = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.loadingContainer}>
      <Image source={icons.loading} />
      <Text style={styles.loadingText}>AI 분석중</Text>
    </View>
  );
};

export default Loading;

const getStyles = theme =>
  StyleSheet.create({
    loadingContainer: {
      alignItems: 'center',
      gap: 10,
    },
    loadingText: {
      color: theme.colors.text,
      fontWeight: 600,
    },
  });
