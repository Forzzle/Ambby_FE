// App.jsx
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import SearchPage from './src/pages/SearchPage';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <SearchPage />
    </SafeAreaView>
  );
};

export default App;
