import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {VisionProvider} from './src/contexts/visionContext';
import Router from './src/Router';
import {ThemeProvider} from './src/contexts/themeContext';
import {CartProvider} from './src/contexts/CartContext';

const App = () => {
  return (
    <ThemeProvider>
      <VisionProvider>
        <CartProvider>
          <NavigationContainer>
            <Router />
          </NavigationContainer>
        </CartProvider>
      </VisionProvider>
    </ThemeProvider>
  );
};

export default App;
