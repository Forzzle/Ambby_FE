import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {VisionProvider} from './src/contexts/visionContext';
import Router from './src/Router';
import {ThemeProvider} from './src/contexts/themeContext';
import {SafeAreaView, StyleSheet} from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemeProvider>
        <VisionProvider>
          <NavigationContainer>
            <Router />
          </NavigationContainer>
        </VisionProvider>
      </ThemeProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default App;
