import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {getBookmarks} from '../utils/bookMarkStorage';
import {useIsFocused} from '@react-navigation/native';
import ListCard from '../components/ListCard';

const ITEMS_PER_PAGE = 5;

const BookMarkPage = () => {
  const [places, setPlaces] = useState([]);
  const isFocused = useIsFocused();
  const [visibleData, setVisibleData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const loadMore = () => {
    const nextData = places.slice(currentIndex, currentIndex + ITEMS_PER_PAGE);
    setVisibleData(prev => [...prev, ...nextData]);
    setCurrentIndex(prev => prev + ITEMS_PER_PAGE);
  };

  useEffect(() => {
    if (isFocused) {
      const loadBookmarkedPlaces = async () => {
        const place = await getBookmarks();
        setPlaces(place);
        setVisibleData([]); // 기존 데이터 초기화
        setCurrentIndex(0);
      };
      loadBookmarkedPlaces();
    }
  }, [isFocused]);

  useEffect(() => {
    if (places.length > 0) {
      const initialData = places.slice(0, ITEMS_PER_PAGE);
      setVisibleData(initialData);
      setCurrentIndex(ITEMS_PER_PAGE);
    }
  }, [places]);

  const renderFooter = () => {
    if (currentIndex >= places.length) {
      return null;
    }

    return (
      <TouchableOpacity style={styles.button} onPress={loadMore}>
        <Text style={styles.buttonText}>더보기</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={visibleData}
        keyExtractor={item => item.id}
        renderItem={({item}) => <ListCard item={item} />}
        contentContainerStyle={{paddingBottom: 20}}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          <Text style={styles.empty}>북마크된 장소가 없습니다.</Text>
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
  button: {
    backgroundColor: '#2e2e2e',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
