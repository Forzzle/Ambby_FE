import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {useState} from 'react';

const FirstRoute = () => (
  <View style={styles.container}>
    <Text>가게 정보</Text>
  </View>
);

const SecondRoute = () => (
  <View style={styles.container}>
    <Text>리뷰</Text>
  </View>
);

const renderScene = SceneMap({
  info: FirstRoute,
  review: SecondRoute,
});

const DetailTabView = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'info', title: '정보'},
    {key: 'review', title: '리뷰'},
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={{backgroundColor: 'black'}}
          style={{backgroundColor: 'lightgray'}}
          activeColor="black"
          inactiveColor="gray"
          renderLabel={({route, focused}) => (
            <Text style={{color: focused ? 'black' : 'gray'}}>
              {route.title}
            </Text>
          )}
        />
      )}
    />
  );
};

export default DetailTabView;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'lightgrey',
  },
});
