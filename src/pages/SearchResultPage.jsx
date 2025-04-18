import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  ActivityIndicator,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import ListCard from '../components/ListCard';
import {useTheme} from '../contexts/themeContext';
import {searchPlaces} from '../apis/placeApi';
import icons from '../constants/icons';

const SearchResultPage = ({route}) => {
  const {data: initialData, query: initialQuery} = route.params;
  const [query, setQuery] = useState(initialQuery);
  const [data, setData] = useState(initialData);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const {theme} = useTheme();
  const styles = getStyles(theme);

  // 초기 데이터 설정
  useEffect(() => {
    setQuery(initialQuery);
    setData(initialData);
  }, [initialData, initialQuery]);

  const loadMore = async () => {
    if (!data.nextPageToken || loadingMore) {
      return;
    }
    console.log('클릭됨');

    setLoadingMore(true);

    try {
      const res = await searchPlaces(query, data.nextPageToken);
      setData(prev => {
        const newPreviews = res?.data?.previews || [];
        const nextToken = res?.data?.nextPageToken || null;

        const uniquePreviews = [
          ...prev.previews,
          ...newPreviews.filter(
            newItem => !prev.previews.some(item => item.id === newItem.id),
          ),
        ];

        return {
          previews: uniquePreviews,
          nextPageToken: nextToken,
        };
      });
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
        <Pressable style={styles.searchIcon} onPress={handleSearch}>
          <Image source={icons.search} />
        </Pressable>
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
      borderWidth: 1, //TODO: 오류해결 제대로 변경
      borderColor: 'transparent',
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
