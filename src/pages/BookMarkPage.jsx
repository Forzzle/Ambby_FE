import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {getBookmarks} from '../utils/bookMarkStorage';
import {useIsFocused} from '@react-navigation/native';

const BookMarkPage = ({navigation}) => {
  const [places, setPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const loadBookmarkedPlaces = async () => {
        const ids = await getBookmarks();
        setPlaces(ids?.map(res => res));
      };
      loadBookmarkedPlaces();
    }
  }, [isFocused]);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('DetailPage', {placeId: item})}>
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={places}
        keyExtractor={item => item?.id?.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.empty}>북마크한 장소가 없어요!</Text>
        }
      />
    </View>
  );
};

export default BookMarkPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  item: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    borderRadius: 10,
  },

  empty: {
    marginTop: 40,
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});
