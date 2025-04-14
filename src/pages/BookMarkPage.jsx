import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {getBookmarks} from '../utils/bookMarkStorage';
import {useIsFocused} from '@react-navigation/native';
import ListCard from '../components/ListCard';

const BookMarkPage = () => {
  const [places, setPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const loadBookmarkedPlaces = async () => {
        const place = await getBookmarks();
        setPlaces(place);
      };
      loadBookmarkedPlaces();
    }
    console.log(places);
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <FlatList
        data={places}
        keyExtractor={item => item?.id?.toString()}
        renderItem={({item}) => <ListCard item={item} />}
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
