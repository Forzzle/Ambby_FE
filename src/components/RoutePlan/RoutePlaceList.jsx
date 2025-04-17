import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import RoutePlaceItem from './RoutePlaceItem';

const RoutePlaceList = ({places, onRemove}) => {
  return (
    <FlatList
      data={places}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.list}
      renderItem={({item}) => (
        <RoutePlaceItem place={item} onRemove={() => onRemove(item.id)} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    gap: 10,
    paddingBottom: 20,
  },
});

export default RoutePlaceList;
