import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {fetchOptimizedRoute} from '../../apis/routePlan';
import {useCart} from '../../contexts/CartContext';
import {useTheme} from '../../contexts/themeContext';

const RouteRequestButton = ({onSuccess, disabled}) => {
  const {theme} = useTheme();
  const styles = getStyles(theme);
  const {places} = useCart();

  const handlePress = async () => {
    try {
      const placeList = places.map(place => `${place.address} ${place.name}`);
      const res = await fetchOptimizedRoute(placeList);
      onSuccess(res.data);
    } catch (error) {
      console.error('최적 경로 요청 실패:', error);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      style={[
        styles.button,
        {
          backgroundColor: disabled
            ? theme.colors.disabled
            : theme.colors.accent,
        },
      ]}>
      <Text style={styles.buttonText}>최적 경로 보기</Text>
    </TouchableOpacity>
  );
};

export default RouteRequestButton;

const getStyles = theme =>
  StyleSheet.create({
    button: {
      borderColor: 'transparent',
      paddingVertical: 20,
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
  });
