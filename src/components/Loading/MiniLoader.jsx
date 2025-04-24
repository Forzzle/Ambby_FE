import React, {useEffect, useRef} from 'react';
import {View, Animated, StyleSheet, Text} from 'react-native';
import {useTheme} from '../../contexts/themeContext';

const MiniLoader = () => {
  const {theme} = useTheme();
  const styles = getStyles(theme);

  const dots = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  useEffect(() => {
    dots.forEach((dot, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot, {
            toValue: -6,
            duration: 300,
            delay: index * 150,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    });
  }, [dots]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.dotWrapper}>
        {dots.map((anim, idx) => (
          <Animated.View
            key={idx}
            style={[
              styles.dot,
              {
                transform: [{translateY: anim}],
              },
            ]}
          />
        ))}
      </View>
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>AI 분석중</Text>
      </View>
    </View>
  );
};

export default MiniLoader;

const getStyles = theme =>
  StyleSheet.create({
    wrapper: {
      alignItems: 'center',
      gap: 12,
    },
    loadingText: {
      color: theme.colors.primary,
      fontWeight: '600',
    },
    loadingContainer: {
      paddingHorizontal: 16,
      paddingVertical: 10,
      backgroundColor: theme.colors.accent,
      borderRadius: 100,
    },
    dotWrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-end',
      gap: 6,
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: theme.colors.primary,
    },
  });
