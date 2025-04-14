import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useVision} from './contexts/visionContext';
import SearchPage from './pages/SearchPage';
import SearchResultPage from './pages/SearchResultPage';
import DetailPage from './pages/DetailPage';
import SoundPage from './pages/SoundPage';
import VisionSettingScreen from './pages/VisionSettingPage';
import BookMarkPage from './pages/BookMarkPage';

const Stack = createStackNavigator();

const Router = () => {
  const {visionMode} = useVision();
  console.log('시각상태:', visionMode);

  return (
    <Stack.Navigator
      initialRouteName={visionMode === 'normal' ? 'VisionSetting' : 'Search'}>
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
        name="BookMarkPage"
        component={BookMarkPage}
        options={{title: '나의 북마크'}}
      />
      <Stack.Screen
        name="VisionSetting"
        component={VisionSettingScreen}
        options={{title: '시각정보 설정'}}
      />
    </Stack.Navigator>
  );
};

export default Router;
