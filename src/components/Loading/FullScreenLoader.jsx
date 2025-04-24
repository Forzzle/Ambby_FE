import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, Text} from 'react-native';
import {useTheme} from '../../contexts/themeContext';
import icons from '../../constants/icons';

const FullScreenLoader = () => {
  const {theme} = useTheme();
  const styles = getStyles(theme);

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        //크기
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
        //투명도
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
      <Animated.Image
        style={[
          styles.icon,
          {
            transform: [{scale: scaleAnim}],
            opacity: opacityAnim,
          },
        ]}
        source={icons.visionSetting}
      />
      <Text style={styles.text}>
        {'AI분석 요청중...\n페이지가 넘어가는 중입니다...'}
      </Text>
    </View>
  );
};

export default FullScreenLoader;

const getStyles = theme =>
  StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      zIndex: 100,
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
