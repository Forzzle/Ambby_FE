import React from 'react';
import {VisionProvider} from './src/contexts/visionContext';
import Router from './src/router';
import {ThemeProvider} from './src/contexts/themeContext';
import {CartProvider} from './src/contexts/CartContext';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {View} from 'react-native';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <GestureHandlerRootView>
        <ThemeProvider>
          <CartProvider>
            <VisionProvider>
              <NavigationContainer>
                <Router />
              </NavigationContainer>
            </VisionProvider>
          </CartProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </View>
  );
};

export default App;
