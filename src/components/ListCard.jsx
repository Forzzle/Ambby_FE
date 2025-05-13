import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../contexts/themeContext';

const ListCard = ({item, showDelete = false, onDelete}) => {
  const navigation = useNavigation();
  const {theme} = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', {placeId: item.id})}
        style={styles.content}>
        <View style={styles.textContainer}>
          <View style={styles.row}>
            <Text style={styles.title}>{item.name}</Text>
            <Text
              style={styles.category}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item.category}
            </Text>
          </View>
          <Text style={styles.address}>{item.simpleAddress}</Text>
        </View>
      </TouchableOpacity>

      {showDelete && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete?.(item.id)}>
          <Text style={styles.deleteText}>×</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ListCard;

const getStyles = theme =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 20,
      paddingHorizontal: 16,
      marginBottom: 4,
      borderBottomWidth: 1,
      borderTopWidth: 1,
      borderTopColor: theme.colors.primary,
      borderBottomColor: theme.colors.primary,
    },
    content: {
      flex: 1,
    },
    textContainer: {
      gap: 10,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.textPrimary,
      maxWidth: '80%',
    },
    category: {
      fontSize: 14,
      fontWeight: '400',
      color: theme.colors.text,
      flexShrink: 1,
    },
    address: {
      marginTop: 4,
      fontSize: 14,
      color: theme.colors.text,
    },
    deleteButton: {
      backgroundColor: '#FF5E5E',
      borderRadius: 14,
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 14,
    },
    deleteText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
