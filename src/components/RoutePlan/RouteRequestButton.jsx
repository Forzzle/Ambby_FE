import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {fetchOptimizedRoute} from '../../apis/routePlan'; // <- 너가 만든 API 함수
import {useCart} from '../../contexts/CartContext';
import {useTheme} from '../../contexts/themeContext';

const RouteRequestButton = ({onSuccess, disabled}) => {
  const {theme} = useTheme();
  const {places} = useCart();

  const handlePress = async () => {
    try {
      const placeList = places.map(place => `${place.address} ${place.name}`); // 주소 + 이름
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
            : theme.colors.primary,
        },
      ]}>
      <Text style={[styles.buttonText, {color: theme.colors.text}]}>
        최적 경로 보기
      </Text>
    </TouchableOpacity>
  );
};

export default RouteRequestButton;

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
});
