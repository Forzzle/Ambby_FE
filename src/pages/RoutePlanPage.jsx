import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from '../contexts/themeContext';
import {useCart} from '../contexts/CartContext';
import ListCard from '../components/ListCard';
import RouteRequestButton from '../components/RoutePlan/RouteRequestButton';
import RouteResultModal from '../components/RouteResultModal';

const RoutePlanPage = () => {
  const {theme} = useTheme();
  const {places, removePlace} = useCart();
  const [modalVisible, setModalVisible] = useState(false);
  const [routeResult, setRouteResult] = useState(null);

  const handleDelete = place => {
    removePlace(place.id);
  };

  const renderItem = ({item}) => (
    <View style={styles.cardContainer}>
      <ListCard item={item} />
      <TouchableOpacity
        onPress={() => handleDelete(item)}
        style={[styles.removeBtn, {backgroundColor: theme.colors.primary}]}>
        <Text style={{color: theme.colors.accent}}>삭제</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.primary}]}>
      <Text style={[styles.title, {color: theme.colors.text}]}>
        선택한 장소 목록
      </Text>

      {places.length === 0 ? (
        <Text
          style={{
            color: theme.colors.text,
            textAlign: 'center',
            marginTop: 20,
          }}>
          아직 선택한 장소가 없습니다.
        </Text>
      ) : (
        <FlatList
          data={places}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{paddingBottom: 40}}
        />
      )}

      <RouteRequestButton
        onSuccess={data => {
          setRouteResult(data);
          setModalVisible(true);
        }}
        disabled={places.length === 0}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  cardContainer: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  removeBtn: {
    padding: 10,
    alignItems: 'center',
  },
});
