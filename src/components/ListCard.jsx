import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ListCard = ({item}) => {
  const navigation = useNavigation();

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
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    width: 'auto',
    maxWidth: '85%',
  },
  category: {
    fontSize: 14,
    fontWeight: '400',
    color: '#555',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  address: {
    marginTop: 4,
    fontSize: 14,
    color: '#444',
  },
});
