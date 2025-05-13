import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {fetchOptimizedRoute} from '../../apis/routePlan';
import {useCart} from '../../contexts/CartContext';
import {useTheme} from '../../contexts/themeContext';

const RouteRequestButton = ({onSuccess, disabled, setIsLoading}) => {
  const {theme} = useTheme();
  const styles = getStyles(theme);
  const {places} = useCart();

  const handlePress = async () => {
    try {
      setIsLoading(true); // 시작
      const placeList = places.map(place => `${place.address} ${place.name}`);
      const res = await fetchOptimizedRoute(placeList);
      onSuccess(res.data);
    } catch (error) {
      console.error('최적 경로 요청 실패:', error);
    } finally {
      setIsLoading(false); // 끝
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel="최적 경로 보기 버튼"
      accessibilityHint="장바구니에 담긴 장소들을 기반으로 최적 경로를 요청합니다"
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
