import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

import {ThemeProvider, useTheme} from './src/contexts/themeContext';
import {VisionProvider} from './src/contexts/visionContext';
import {CartProvider} from './src/contexts/CartContext';
import Router from './src/router';

const AppInner = () => {
  const {theme} = useTheme();
  const styles = getStyles(theme);

  return (
    <GestureHandlerRootView style={styles.gestureRoot}>
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

const App = () => (
  <ThemeProvider>
    <AppInner />
  </ThemeProvider>
);

export default App;

const getStyles = theme =>
  StyleSheet.create({
    gestureRoot: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
  });
