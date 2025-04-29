import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext();

export const CartProvider = ({children}) => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      const storedPlaces = await AsyncStorage.getItem('places');
      if (storedPlaces) {
        setPlaces(JSON.parse(storedPlaces));
      }
    };

    loadCart();
  }, []);

  const addPlace = async place => {
    setPlaces(prev => {
      const updatedPlaces = prev.some(p => p.id === place.id)
        ? prev
        : [...prev, place];
      AsyncStorage.setItem('places', JSON.stringify(updatedPlaces)); // Save updated places
      return updatedPlaces;
    });
  };

  const removePlace = async id => {
    setPlaces(prev => {
      const updatedPlaces = prev.filter(p => p.id !== id);
      AsyncStorage.setItem('places', JSON.stringify(updatedPlaces)); // Save updated places
      return updatedPlaces;
    });
  };

  const clearCart = async () => {
    setPlaces([]);
    await AsyncStorage.removeItem('places'); // Clear cart in AsyncStorage
  };

  return (
    <CartContext.Provider value={{places, addPlace, removePlace, clearCart}}>
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
