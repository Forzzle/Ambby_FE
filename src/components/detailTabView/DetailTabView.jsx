import {TabView, TabBar} from 'react-native-tab-view';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {useState} from 'react';
import {useTheme} from '../../contexts/themeContext';
import ReviewTab from './ReviewTab';
import InfoTab from './InfoTab';

const DetailTabView = ({review, accessibility}) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'review', title: '리뷰'},
    {key: 'info', title: '정보'},
  ]);

  const {theme} = useTheme();
  const styles = getStyles(theme);

  const renderScene = ({route}) => {
    let content = null;
    switch (route.key) {
      case 'review':
        content = <ReviewTab data={review} />;
        break;
      case 'info':
        content = <InfoTab data={accessibility} />;
        break;
    }
    return <View style={styles.scene}>{content}</View>;
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
      flex: 1,
      marginBottom: 100,
      backgroundColor: theme.colors.background,
      borderTopWidth: 1,
      borderTopColor: theme.colors.secondary,
    },
    scene: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.colors.background,
    },
  });
