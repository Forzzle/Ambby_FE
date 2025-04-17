import React, {useEffect, useState} from 'react';
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
import {searchPlaces} from '../apis/placeApi';

const SearchResultPage = ({route}) => {
  const {theme} = useTheme();

  const {data, query: initialQuery, nextPageToken: initialToken} = route.params;

  const [query, setQuery] = useState(initialQuery); // 수정 가능한 검색어
  const [visibleData, setVisibleData] = useState(data || []);
  const [nextPageToken, setNextPageToken] = useState(initialToken || null);
  const [loading, setLoading] = useState(false);

  // 초기 검색 결과 이후 pageToken 기반 더보기
  const loadMore = async () => {
    if (!nextPageToken) return;

    setLoading(true);
    try {
      const res = await searchPlaces(query, nextPageToken);
      console.log('검색 리스트 응답 보기 ! ', res);

      const nextData = res.data?.previews || [];
      setVisibleData(prev => [...prev, ...nextData]);
      setNextPageToken(res.data?.nextPageToken || null);
    } catch (error) {
      console.error('추가 데이터 요청 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  // 새로 검색하기 버튼
  const handleNewSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await searchPlaces(query);
      const newData = res.data?.previews || [];
      setVisibleData(newData);
      setNextPageToken(res.data?.nextPageToken || null);
    } catch (e) {
      console.error('새 검색 실패:', e);
    } finally {
      setLoading(false);
    }
  };

  const renderFooter = () => {
    if (!nextPageToken) return null;

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
        onChangeText={setQuery}
        style={[
          styles.searchInput,
          {
            backgroundColor: theme.colors.accent,
            color: theme.colors.text,
            borderColor: theme.colors.border,
          },
        ]}
        multiline
        accessibilityLabel={query}
      />

      <TouchableOpacity
        style={[styles.button, {backgroundColor: theme.colors.primary}]}
        onPress={handleNewSearch}>
        <Text style={[styles.buttonText, {color: theme.colors.accent}]}>
          다시 검색하기
        </Text>
      </TouchableOpacity>

      <FlatList
        data={visibleData}
        keyExtractor={item => item.id}
        renderItem={({item}) => <ListCard item={item} />}
        contentContainerStyle={{paddingBottom: 20}}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          <Text style={[styles.empty, {color: theme.colors.text}]}>
            장소를 찾을 수 없습니다.
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
    marginBottom: 10,
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
    marginBottom: 10,
  },
  buttonText: {
    fontWeight: 'bold',
  },
});
