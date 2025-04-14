import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {VisionProvider} from './src/contexts/visionContext';
import Router from './src/Router';

const App = () => {
  return (
    <VisionProvider>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </VisionProvider>
  );
};

export default App;
