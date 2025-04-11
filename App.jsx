import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import SearchPage from './src/pages/SearchPage';
import DeatilPage from './src/pages/DeatilPage';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      {/* <SearchPage /> */}
      <DeatilPage />
    </SafeAreaView>
  );
};

export default App;
