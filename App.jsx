import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SearchPage from './src/pages/SearchPage';
import SearchResultPage from './src/pages/SearchResultPage';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <SearchPage />
    </SafeAreaView>
  );
};
const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen
        name="Search"
        component={SearchPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SearchResult"
        component={SearchResultPage}
        options={{title: '�˻� ���'}}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
