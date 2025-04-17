import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import ListCard from '../components/ListCard';
import {useTheme} from '../contexts/themeContext';
import {searchPlaces} from '../apis/placeApi';
import icons from '../constants/icons';

const SearchResultPage = ({route}) => {
  const {data: initialData, query: initialQuery} = route.params;
  const [query, setQuery] = useState(initialQuery); // 현재 입력 중인 쿼리
  const [data, setData] = useState(initialData); // 현재까지의 검색 결과
  const [loadingSearch, setLoadingSearch] = useState(false); // 검색 로딩 상태
  const [loadingMore, setLoadingMore] = useState(false); // 더보기 로딩 상태

  const {theme} = useTheme();
  const styles = getStyles(theme);

  // 초기 데이터 설정
  useEffect(() => {
    setQuery(initialQuery);
    setData(initialData);
  }, [initialData, initialQuery]);

  // 더보기 기능
  const loadMore = async () => {
    if (!data.nextPageToken || loadingMore) {
      return;
    }
    setLoadingMore(true);
    try {
      const res = await searchPlaces(query, data.nextPageToken);
      setData(prev => ({
        ...prev,
        previews: [...prev?.previews, ...res?.data?.previews],
        nextPageToken: res?.data?.nextPageToken,
      }));
    } catch (error) {
      console.error('더보기 요청 실패:', error);
    } finally {
      setLoadingMore(false);
    }
  };
  // 검색 기능
  const handleSearch = async () => {
    setLoadingSearch(true);
    try {
      const res = await searchPlaces(query);
      setData(res.data);
    } catch (error) {
      console.error('재검색 실패:', error);
    } finally {
      setLoadingSearch(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.searchIcon}>
          <Image source={icons.search} />
        </View>
        <TextInput
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          style={styles.input}
          multiline
          placeholder={
            '가고 싶은 여행지를 문장으로 자유롭게 표현해 보세요!\n상세할수록 좋습니다'
          }
          textAlign="center"
          blurOnSubmit={true}
          placeholderTextColor={theme.colors.placeholder}
        />
      </View>

      <FlatList
        data={data.previews}
        keyExtractor={item => item.id}
        renderItem={({item}) => <ListCard item={item} />}
        ListEmptyComponent={
          <Text style={[styles.empty, {color: theme.colors.text}]}>
            검색 결과가 없습니다.
          </Text>
        }
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator size="small" color={theme.colors.primary} />
          ) : data.nextPageToken ? (
            <TouchableOpacity style={styles.button} onPress={loadMore}>
              <Text style={styles.buttonText}>더보기</Text>
            </TouchableOpacity>
          ) : null
        }
      />
    </View>
  );
};

export default SearchResultPage;

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.primary,
    },
    inputContainer: {
      backgroundColor: theme.colors.secondary,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 30,
      marginBottom: 10,
      zIndex: 10,
    },
    searchIcon: {
      backgroundColor: theme.colors.primary,
      width: 50,
      height: 50,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      padding: 20,
      fontSize: 16,
      textAlign: 'center',
      color: theme.colors.primary,
      fontWeight: 800,
      lineHeight: 28,
      zIndex: 10,
    },
    empty: {
      marginTop: 40,
      fontSize: 16,
      textAlign: 'center',
    },
    button: {
      paddingVertical: 20,
      alignItems: 'center',
      marginTop: 8,
      backgroundColor: theme.colors.secondary,
    },
    buttonText: {
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
  });
