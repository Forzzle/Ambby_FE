import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SearchPage from './src/pages/SearchPage';
import SearchResultPage from './src/pages/SearchResultPage';
import DetailPage from './src/pages/DetailPage';
import SoundPage from './src/pages/SoundPage';

const Stack = createStackNavigator();

console.log('✅ App 컴포넌트 진입 확인');

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
        options={{title: '검색 결과'}}
      />
      <Stack.Screen
        name="DetailPage"
        component={DetailPage}
        options={{title: '상세페이지'}}
      />
      <Stack.Screen
        name="Sound"
        component={SoundPage}
        options={{title: '사운드 테스트'}}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
