import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {getBookmarks} from '../utils/bookMarkStorage';
import {useIsFocused} from '@react-navigation/native';
import ListCard from '../components/ListCard';
import {useTheme} from '../contexts/themeContext';
import {removeBookmark} from '../utils/bookMarkStorage';
const ITEMS_PER_PAGE = 5;

const BookMarkPage = () => {
  const [places, setPlaces] = useState([]);
  const [visibleData, setVisibleData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isFocused = useIsFocused();
  const {theme} = useTheme();
  const styles = getStyles(theme);

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
        setVisibleData([]);
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
        <Text style={styles.buttonText}>+ 더보기</Text>
      </TouchableOpacity>
    );
  };
  const handleDelete = async id => {
    await removeBookmark(id);
    setVisibleData(prev => prev.filter(item => item.id !== id));
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={visibleData}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ListCard
            item={item}
            showDelete
            onDelete={() => handleDelete(item.id)}
          />
        )}
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

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    empty: {
      marginTop: 40,
      fontSize: 16,
      textAlign: 'center',
      color: theme.colors.text,
    },
    button: {
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
