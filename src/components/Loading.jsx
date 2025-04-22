import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import icons from '../constants/icons';
import {useTheme} from '../contexts/themeContext';

const Loading = () => {
  const {theme} = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.wrapper}>
      <Image source={icons.loading} />
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>AI 분석중</Text>
      </View>
    </View>
  );
};

export default Loading;

const getStyles = theme =>
  StyleSheet.create({
    wrapper: {
      alignItems: 'center',
      gap: 20,
    },
    loadingText: {
      color: theme.colors.primary,
      fontWeight: 600,
    },
    loadingContainer: {
      padding: 12,
      backgroundColor: theme.colors.accent,
      borderRadius: 100,
    },
  });
