import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {VisionProvider} from './src/contexts/visionContext';
import Router from './src/Router';
import {ThemeProvider} from './src/contexts/themeContext';

const App = () => {
  return (
    <ThemeProvider>
      <VisionProvider>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </VisionProvider>
    </ThemeProvider>
  );
};

export default App;
