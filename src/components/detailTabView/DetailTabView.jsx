import {TabView, TabBar} from 'react-native-tab-view';
import {StyleSheet, Text, useWindowDimensions} from 'react-native';
import {useState} from 'react';
import {useTheme} from '../../contexts/themeContext';
import ReviewTab from './ReviewTab';
import InfoTab from './InfoTab';

const DetailTabView = ({reviewInfo, accessibilityInfo}) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'review', title: '리뷰'},
    {key: 'info', title: '정보'},
  ]);

  const {theme} = useTheme();
  const styles = getStyles(theme);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'review':
        return <ReviewTab reviewInfo={reviewInfo} />;
      case 'info':
        return <InfoTab accessibilityInfo={accessibilityInfo} />;
      default:
        return null;
    }
  };

  return (
    <TabView
      style={styles.container}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={{backgroundColor: theme.colors.secondary}}
          style={{backgroundColor: theme.colors.primary}}
          activeColor={theme.colors.secondary}
          inactiveColor={theme.colors.text}
          renderLabel={({route, focused}) => (
            <Text
              style={{
                color: focused ? theme.colors.primary : theme.colors.secondary,
              }}>
              {route.title}
            </Text>
          )}
        />
      )}
    />
  );
};

export default DetailTabView;
const getStyles = theme =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      borderTopColor: theme.colors.secondary,
      borderBottomColor: theme.colors.secondary,
    },
  });
