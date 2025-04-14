import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SearchPage from './src/pages/SearchPage';
import SearchResultPage from './src/pages/SearchResultPage';
import DetailPage from './src/pages/DetailPage';
import SoundPage from './src/pages/SoundPage';
import VisionSettingScreen from './src/pages/VisionSettingPage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const App = () => {
  const [isVisionSet, setIsVisionSet] = useState(null);

  useEffect(() => {
    const checkVisionSetting = async () => {
      const value = await AsyncStorage.getItem('visionSetting');
      setIsVisionSet(value !== null);
    };
    checkVisionSetting();
  }, []);

  if (isVisionSet === null) {
    // 로딩 구현
    return null;
  }

  return (
    <NavigationContainer>
      {/* 시각정보 저장은 최초1회 */}
      <Stack.Navigator
        initialRouteName={isVisionSet ? 'Search' : 'VisionSetting'}>
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
        <Stack.Screen
          name="VisionSetting"
          component={VisionSettingScreen}
          options={{title: '시각정보 설정'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
