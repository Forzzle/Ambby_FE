import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import ListCard from '../ListCard';
import {useTheme} from '../../contexts/themeContext';

const RoutePlaceItem = ({item, onDelete}) => {
  const {theme} = useTheme();

  return (
    <View style={styles.container}>
      <ListCard item={item} />
      <TouchableOpacity
        onPress={() => onDelete(item)}
        style={[styles.removeBtn, {backgroundColor: theme.colors.primary}]}>
        <Text style={{color: theme.colors.accent}}>삭제</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RoutePlaceItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  removeBtn: {
    padding: 10,
    alignItems: 'center',
  },
});
