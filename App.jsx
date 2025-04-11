import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SearchPage from './src/pages/SearchPage';
import SearchResultPage from './src/pages/SearchResultPage';

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
        options={{title: 'ï¿½Ë»ï¿½ ï¿½ï¿½ï¿?'}}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
