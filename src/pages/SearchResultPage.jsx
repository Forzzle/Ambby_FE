import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import ListCard from '../components/ListCard';

const ITEMS_PER_PAGE = 5;

const SearchResultPage = ({route}) => {
  const {data, query} = route.params;
  const [visibleData, setVisibleData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    loadMore(); // 처음 5개 로딩
  }, []);

  const loadMore = () => {
    const nextData = data.slice(currentIndex, currentIndex + ITEMS_PER_PAGE);
    setVisibleData(prev => [...prev, ...nextData]);
    setCurrentIndex(prev => prev + ITEMS_PER_PAGE);
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={query}
        style={styles.searchInput}
        editable={false}
        multiline
        accessibilityLabel={query}
      />

      <FlatList
        data={visibleData}
        keyExtractor={item => item.id}
        renderItem={({item}) => <ListCard item={item} />}
        contentContainerStyle={{paddingBottom: 20}}
      />

      {currentIndex < data.length && (
        <TouchableOpacity style={styles.button} onPress={loadMore}>
          <Text style={styles.buttonText}>더보기</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchResultPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#f2f2f2',
    color: '#000',
  },
  header: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
  card: {
    backgroundColor: '#eee',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  category: {
    fontSize: 14,
    fontWeight: '400',
    color: '#555',
  },
  address: {
    marginTop: 4,
    fontSize: 14,
    color: '#444',
  },
  button: {
    backgroundColor: '#ccc',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#333',
    fontWeight: 'bold',
  },
});
