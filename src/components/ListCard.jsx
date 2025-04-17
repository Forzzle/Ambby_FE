import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../contexts/themeContext';

const ListCard = ({item}) => {
  const navigation = useNavigation();

  const {theme} = useTheme();
  const styles = getStyles(theme);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('DetailPage', {placeId: item.id})}
      style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>
      <Text style={styles.address}>{item.simpleAddress}</Text>
    </TouchableOpacity>
  );
};

export default ListCard;

const getStyles = theme =>
  StyleSheet.create({
    card: {
      padding: 16,
      marginBottom: 4,
      flex: 1,
      borderWidth: 1,
      borderColor: theme.colors.primary,
      borderTopColor: theme.colors.secondary,
      borderBottomColor: theme.colors.secondary,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      width: 'auto',
      maxWidth: '85%',
      color: theme.colors.secondary,
    },
    category: {
      fontSize: 14,
      fontWeight: '400',
      color: theme.colors.text,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'space-between',
    },
    address: {
      marginTop: 4,
      fontSize: 14,
      color: theme.colors.text,
    },
  });
