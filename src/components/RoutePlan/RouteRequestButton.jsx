import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useTheme} from '../../contexts/themeContext';

const RouteRequestButton = ({onPress, disabled}) => {
  const {theme} = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {backgroundColor: theme.colors.primary, opacity: disabled ? 0.5 : 1},
      ]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={[styles.text, {color: theme.colors.accent}]}>
        최적 경로 보기
      </Text>
    </TouchableOpacity>
  );
};

export default RouteRequestButton;

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
