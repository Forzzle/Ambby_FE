import {TabView, TabBar} from 'react-native-tab-view';
import {Text, useWindowDimensions} from 'react-native';
import {useState} from 'react';
import ReviewTab from './ReviewTab';
import InfoTab from './InfoTab';

const DetailTabView = ({reviewInfo, accessibilityInfo}) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'review', title: '리뷰'},
    {key: 'info', title: '정보'},
  ]);

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
