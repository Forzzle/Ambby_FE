import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Alert,
  View,
  Text,
  SafeAreaView,
  FlatList,
  TextInput,
  ActivityIndicator,
  Image,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
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

  const flatListRef = useRef(null);
  const {theme} = useTheme();
  const styles = getStyles(theme);

  useEffect(() => {
    setQuery(initialQuery);
    setData(initialData);
  }, [initialData, initialQuery]);

  const loadMore = async () => {
    if (!data.nextPageToken || loadingMore) {
      return;
    }
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

  const handleSearch = async () => {
    Keyboard.dismiss(); // 키보드 닫기
    setLoadingSearch(true);
    try {
      const res = await searchPlaces(query);
      setData(res.data);
      //FlatList 최상단 스크롤
      setTimeout(() => {
        flatListRef.current?.scrollToOffset({offset: 0, animated: true});
      }, 100);
    } catch (error) {
      Alert.alert('오류', '검색 중 오류가 발생했습니다. 다시 시도해 주세요.');
      console.error('재검색 실패:', error);
    } finally {
      setLoadingSearch(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
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
        </View>

        <FlatList
          ref={flatListRef}
          data={data.previews}
          keyExtractor={item => item.id}
          renderItem={({item}) => <ListCard item={item} />}
          keyboardShouldPersistTaps="handled"
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
      </KeyboardAvoidingView>
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
      fontWeight: '800',
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
