import React, {createContext, useContext, useState} from 'react';

const CartContext = createContext();

export const CartProvider = ({children}) => {
  const [places, setPlaces] = useState([]);

  const addPlace = place => {
    setPlaces(prev => {
      if (prev.some(p => p.id === place.id)) {
        return prev;
      }
      return [...prev, place];
    });
  };

  const removePlace = id => {
    setPlaces(prev => prev.filter(p => p.id !== id));
  };

  const clearCart = () => {
    setPlaces([]);
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
