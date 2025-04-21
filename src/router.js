import React, {useEffect} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

import {useVision} from './contexts/visionContext';

import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';
import SearchResultPage from './pages/SearchResultPage';
import SoundPage from './pages/SoundPage';
import VisionSettingScreen from './pages/VisionSettingPage';
import BookMarkPage from './pages/BookMarkPage';
import SettingPage from './pages/SettingPage';
import RoutePlanPage from './pages/RoutePlanPage';

const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 60, // 원하는 높이 설정
        },
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarIconStyle: {
          height: 24,
          width: 24,
        },
      }}>
      <Tab.Screen
        name="SearchTab"
        component={SearchStack}
        options={{
          tabBarLabel: '검색',
          tabBarOnPress: () => {
            console.log('Search Tab clicked');
            // 탭 클릭 시 발생하는 이벤트 로깅
          },
        }}
      />
      <Tab.Screen
        name="BookMarkTab"
        component={BookMarkStack}
        options={{
          tabBarLabel: '북마크',
          tabBarOnPress: () => {
            console.log('Search Tab clicked');
            // 탭 클릭 시 발생하는 이벤트 로깅
          },
        }}
      />
      <Tab.Screen
        name="RoutePlanTab"
        component={RoutePlanStack}
        options={{tabBarLabel: '장바구니'}}
      />
      <Tab.Screen
        name="SettingTab"
        component={SettingStack}
        options={{tabBarLabel: '설정'}}
      />
    </Tab.Navigator>
  );
};
// 검색 탭

const SearchStack = () => {
  useEffect(() => {
    console.log('SearchStack mounted or changed');
  }, []);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Search" component={SearchPage} />
      <Stack.Screen name="SearchResult" component={SearchResultPage} />
    </Stack.Navigator>
  );
};

// 북마크 탭
const BookMarkStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="BookMark" component={BookMarkPage} />
  </Stack.Navigator>
);

// 설정 탭
const SettingStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="VisionSetting" component={VisionSettingScreen} />
    <Stack.Screen name="Setting" component={SettingPage} />
    <Stack.Screen name="Sound" component={SoundPage} />
  </Stack.Navigator>
);

// 경로계획 탭
const RoutePlanStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="RoutePlan" component={RoutePlanPage} />
    <Stack.Screen name="Detail" component={DetailPage} />
  </Stack.Navigator>
);

const Router = () => {
  // const {visionMode} = useVision();

  // if (visionMode === 'normal') {
  //   return (
  //     <RootStack.Navigator screenOptions={{headerShown: false}}>
  //       <RootStack.Screen
  //         name="VisionSetting"
  //         component={VisionSettingScreen}
  //       />
  //     </RootStack.Navigator>
  //   );
  // }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="Detail" component={DetailPage} />
    </Stack.Navigator>
  );
};

export default Router;
