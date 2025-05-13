import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

import {ThemeProvider, useTheme} from './src/contexts/themeContext';
import {VisionProvider} from './src/contexts/visionContext';
import {CartProvider} from './src/contexts/CartContext';
import Router from './src/router';

const AppContent = () => {
  const {theme} = useTheme();

  return (
    <GestureHandlerRootView
      style={[styles.gestureRoot, {backgroundColor: theme.colors.background}]}>
      <CartProvider>
        <VisionProvider>
          <NavigationContainer>
            <Router />
          </NavigationContainer>
        </VisionProvider>
      </CartProvider>
    </GestureHandlerRootView>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  gestureRoot: {
    flex: 1,
  },
});
