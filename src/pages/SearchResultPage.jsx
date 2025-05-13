import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
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
import Header from '../components/Header';

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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header height={40} />
        <View style={styles.inputContainer}>
          <Pressable
            style={styles.iconWrapper}
            onPress={handleSearch}
            accessibilityLabel="검색 버튼"
            accessibilityHint="입력한 문장으로 장소를 검색합니다"
            accessibilityRole="button">
            <Image style={styles.icon} source={icons.search} />
          </Pressable>
          <TextInput
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            style={styles.input}
            multiline={true}
            placeholder={'가고 싶은 여행지를 문장으로 자유롭게 표현해 보세요!'}
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
              <ActivityIndicator
                size="small"
                color={theme.colors.primary}
                style={{margin: 20}}
              />
            ) : data.nextPageToken ? (
              <TouchableOpacity style={styles.button} onPress={loadMore}>
                <Text style={styles.buttonText}>+ 더보기</Text>
              </TouchableOpacity>
            ) : null
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default SearchResultPage;

const getStyles = theme =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.primary,
    },
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    inputContainer: {
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginBottom: 10,
      zIndex: 10,
    },
    iconWrapper: {
      backgroundColor: theme.colors.secondary,
      width: 50,
      height: 50,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      width: 32,
      height: 32,
      resizeMode: 'contain',
      tintColor: theme.colors.primary,
    },
    input: {
      margin: 10,
      fontSize: 16,
      textAlign: 'center',
      color: theme.colors.textOnPrimary,
      fontWeight: 800,
      lineHeight: 28,
      minHeight: 64,
      textAlignVertical: 'center',
    },
    empty: {
      marginTop: 40,
      fontSize: 16,
      textAlign: 'center',
    },
    button: {
      borderColor: 'transparent',
      paddingVertical: 20,
      alignItems: 'center',
      backgroundColor: theme.colors.accent,
    },
    buttonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
  });
