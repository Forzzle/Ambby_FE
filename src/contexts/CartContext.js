import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

const CartContext = createContext();

export const CartProvider = ({children}) => {
  const [places, setPlaces] = useState([]);

  // 장바구니 로드
  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedPlaces = await AsyncStorage.getItem('places');
        if (storedPlaces) {
          setPlaces(JSON.parse(storedPlaces));
        }
      } catch (error) {
        console.error('장바구니 불러오기 실패', error);
      }
    };
    loadCart();
  }, []);

  // 추가
  const addPlace = async place => {
    setPlaces(prev => {
      const alreadyExists = prev.some(p => p.id === place.id);
      if (alreadyExists) {
        return prev;
      }

      const updatedPlaces = [place, ...prev]; // 최신순
      savePlaces(updatedPlaces);
      return updatedPlaces;
    });
    Alert.alert('장소 추가됨', `${place.name}이(가) 루트에 추가되었습니다.`);
  };

  // 제거
  const removePlace = async place => {
    setPlaces(prev => {
      const updatedPlaces = prev.filter(p => p.id !== place.id);
      savePlaces(updatedPlaces);
      return updatedPlaces;
    });
    Alert.alert('장소 제거됨', `${place.name}이(가) 루트에서 제거되었습니다.`);
  };

  // 추가 or 제거
  const togglePlace = place => {
    const exists = places.some(p => p.id === place.id);
    if (exists) {
      removePlace(place);
    } else {
      addPlace(place);
    }
  };

  // 저장
  const savePlaces = async updatedPlaces => {
    try {
      await AsyncStorage.setItem('places', JSON.stringify(updatedPlaces));
    } catch (error) {
      console.error('장소 저장 실패', error);
    }
  };

  // 비우기
  const clearCart = async () => {
    try {
      setPlaces([]);
      await AsyncStorage.removeItem('places');
    } catch (error) {
      console.error('장바구니 비우기 실패', error);
    }
  };

  return (
    <CartContext.Provider
      value={{places, addPlace, removePlace, togglePlace, clearCart}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
