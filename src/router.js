import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {useVision} from './contexts/visionContext';
import {useTheme} from './contexts/themeContext';

import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';
import SearchResultPage from './pages/SearchResultPage';
import SoundPage from './pages/SoundPage';
import VisionSettingPage from './pages/VisionSettingPage';
import ThemeSettingPage from './pages/ThemeSettingPage';
import BookMarkPage from './pages/BookMarkPage';
import SettingPage from './pages/SettingPage';
import RoutePlanPage from './pages/RoutePlanPage';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabBtn = ({onPress, accessibilityState, routeName}) => {
  const selected = accessibilityState.selected;
  const {theme} = useTheme();

  const getLabel = () => {
    switch (routeName) {
      case 'SearchTab':
        return '검색';
      case 'BookMarkTab':
        return '북마크';
      case 'RoutePlanTab':
        return '여행추가';
      case 'SettingTab':
        return '설정';
      default:
        return '';
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.tabButton,
        {
          backgroundColor: selected
            ? theme.colors.secondary
            : theme.colors.primary,
        },
      ]}>
      <Text
        style={[
          styles.tabText,
          {
            color: selected ? theme.colors.primary : theme.colors.textOnPrimary,
          },
        ]}>
        {getLabel()}
      </Text>
    </TouchableOpacity>
  );
};

const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarButton: props => <TabBtn {...props} routeName={route.name} />,
        tabBarStyle: styles.tabBar,
        headerShown: false,
      })}>
      <Tab.Screen name="SearchTab" component={SearchStack} />
      <Tab.Screen name="BookMarkTab" component={BookMarkStack} />
      <Tab.Screen name="RoutePlanTab" component={RoutePlanStack} />
      <Tab.Screen name="SettingTab" component={SettingStack} />
    </Tab.Navigator>
  );
};

const SearchStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Search" component={SearchPage} />
    <Stack.Screen name="SearchResult" component={SearchResultPage} />
  </Stack.Navigator>
);

const BookMarkStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="BookMark" component={BookMarkPage} />
  </Stack.Navigator>
);

const SettingStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Setting" component={SettingPage} />
    <Stack.Screen name="VisionSetting" component={VisionSettingPage} />
    <Stack.Screen name="ThemeSetting" component={ThemeSettingPage} />
    <Stack.Screen name="Sound" component={SoundPage} />
  </Stack.Navigator>
);

const RoutePlanStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="RoutePlan" component={RoutePlanPage} />
  </Stack.Navigator>
);

const Router = () => {
  const {visionMode} = useVision();

  if (visionMode === 'normal') {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="VisionSetting" component={VisionSettingPage} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="Detail" component={DetailPage} />
    </Stack.Navigator>
  );
};

export default Router;

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabBar: {
    flexDirection: 'row',
    height: 60,
  },
});
