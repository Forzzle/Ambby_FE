import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from '../context/ThemeContext';

const ScreenContainer = ({children, style}) => {
  const {highContrast} = useTheme();

  return (
    <View
      style={[
        styles.container,
        highContrast ? styles.highContrast : styles.default,
        style,
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  default: {
    backgroundColor: '#fff',
  },
  highContrast: {
    backgroundColor: '#000',
  },
});

export default ScreenContainer;
