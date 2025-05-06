import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useTheme} from '../contexts/themeContext';
import {useCart} from '../contexts/CartContext';
import ListCard from '../components/ListCard';
import RouteRequestButton from '../components/RoutePlan/RouteRequestButton';
import RouteResultModal from '../components/RoutePlan/RouteResultModal';
import Header from '../components/Header';
import icons from '../constants/icons';
import FullScreenLoader from '../components/Loading/FullScreenLoader';

const RoutePlanPage = () => {
  const {theme} = useTheme();
  const styles = getStyles(theme);
  const {places, removePlace} = useCart();
  const [modalVisible, setModalVisible] = useState(false);
  const [routeResult, setRouteResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={styles.container}>
      {isLoading && <FullScreenLoader isBlur={true} />}
      <Header height={140} icon={icons.route} title={'여행 추가 페이지'} />
      {places.length === 0 ? (
        <Text style={styles.emptyText}>
          {
            '아직 선택한 장소가 없습니다.\n 장소를 저장해두고 최적 경로를 알아보세요.'
          }
        </Text>
      ) : (
        <FlatList
          data={places}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <ListCard
              item={item}
              showDelete
              onDelete={() => removePlace(item.id)}
            />
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}
      <View style={places.length === 0 && {margin: 'auto'}} />
      <RouteRequestButton
        onSuccess={data => {
          setRouteResult(data);
          setModalVisible(true);
        }}
        disabled={places.length === 0}
        setIsLoading={setIsLoading}
      />
      <RouteResultModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        routeData={routeResult}
      />
    </View>
  );
};

export default RoutePlanPage;

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },

    emptyText: {
      color: theme.colors.primary,
      textAlign: 'center',
      marginTop: 100,
      justifyContent: 'center',
    },
    listContainer: {
      paddingBottom: 40,
    },
    cardContainer: {
      marginBottom: 16,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      overflow: 'hidden',
    },
  });
