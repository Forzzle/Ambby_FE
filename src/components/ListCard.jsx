import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../context/ThemeContext';

const ListCard = ({item}) => {
  const navigation = useNavigation();
  const {theme} = useTheme();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('DetailPage', {placeId: item.id})}
      style={[styles.card, {backgroundColor: theme.colors.background}]}>
      <View style={styles.row}>
        <Text style={[styles.title, {color: theme.colors.text}]}>
          {item.name}
        </Text>
        <Text style={[styles.category, {color: theme.colors.text}]}>
          {item.category}
        </Text>
      </View>
      <Text style={[styles.address, {color: theme.colors.text}]}>
        {item.simpleAddress}
      </Text>
    </TouchableOpacity>
  );
};

export default ListCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 'auto',
    maxWidth: '85%',
  },
  category: {
    fontSize: 14,
    fontWeight: '400',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  address: {
    marginTop: 4,
    fontSize: 14,
  },
});
