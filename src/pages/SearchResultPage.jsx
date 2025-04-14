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
import {useTheme} from '../contexts/themeContext';

const ITEMS_PER_PAGE = 5;

const SearchResultPage = ({route}) => {
  const {data, query} = route.params;
  const [visibleData, setVisibleData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const {theme} = useTheme();

  useEffect(() => {
    loadMore(); // 처음 5개 로딩
  }, []);

  const loadMore = () => {
    const nextData = data.slice(currentIndex, currentIndex + ITEMS_PER_PAGE);
    setVisibleData(prev => [...prev, ...nextData]);
    setCurrentIndex(prev => prev + ITEMS_PER_PAGE);
  };

  const renderFooter = () => {
    if (currentIndex >= data.length) {
      return null;
    }
    return (
      <TouchableOpacity
        style={[styles.button, {backgroundColor: theme.colors.primary}]}
        onPress={loadMore}>
        <Text style={[styles.buttonText, {color: theme.colors.accent}]}>
          더보기
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <TextInput
        value={query}
        style={[
          styles.searchInput,
          {
            backgroundColor: theme.colors.accent,
            color: theme.colors.text,
            borderColor: theme.colors.border,
          },
        ]}
        editable={false}
        multiline
        accessibilityLabel={query}
      />

      <FlatList
        data={visibleData}
        keyExtractor={item => item.id}
        renderItem={({item}) => <ListCard item={item} />}
        contentContainerStyle={{paddingBottom: 20}}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          <Text style={[styles.empty, {color: theme.colors.text}]}>
            북마크된 장소가 없습니다.
          </Text>
        }
      />
    </View>
  );
};

export default SearchResultPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 20,
  },
  empty: {
    marginTop: 40,
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    fontWeight: 'bold',
  },
});
