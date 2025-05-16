import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, Text} from 'react-native';
import {useTheme} from '../../contexts/themeContext';
import icons from '../../constants/icons';

const FullScreenLoader = ({isBlur = false}) => {
  const {theme} = useTheme();
  const styles = getStyles(theme, isBlur);

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1.05,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.6,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start();
  }, [scaleAnim, opacityAnim]);

  return (
    <View style={styles.container}>
      {isBlur && <View style={styles.overlay} />}
      <Animated.Image
        style={[
          styles.icon,
          {
            transform: [{scale: scaleAnim}],
            opacity: opacityAnim,
          },
        ]}
        source={icons.visionOn}
      />
      <Text style={styles.text}>{'AI분석 요청중...'}</Text>
    </View>
  );
};

const getStyles = (theme, isBlur) =>
  StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isBlur ? 'transparent' : theme.colors.background,
      zIndex: 100,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.colors.background,
      opacity: 0.9,
    },
    icon: {
      width: 60,
      height: 60,
      marginBottom: 20,
      resizeMode: 'contain',
      tintColor: theme.colors.primary,
    },
    text: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.primary,
      textAlign: 'center',
      marginBottom: 20,
    },
  });

export default FullScreenLoader;
