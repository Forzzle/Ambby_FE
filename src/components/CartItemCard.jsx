import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useCart} from '../contexts/CartContext';
import {useTheme} from '../contexts/themeContext';

const CartItemCard = ({place}) => {
  const {removePlace} = useCart();
  const {theme} = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.accent,
          borderColor: theme.colors.border,
        },
      ]}>
      <View style={styles.row}>
        <Text style={[styles.name, {color: theme.colors.text}]}>
          {place.name}
        </Text>
        <Text style={[styles.category, {color: theme.colors.text}]}>
          {place.category}
        </Text>
      </View>
      <Text style={[styles.address, {color: theme.colors.text}]}>
        {place.simpleAddress}
      </Text>
      <TouchableOpacity
        onPress={() => removePlace(place.id)}
        style={[styles.removeBtn, {backgroundColor: theme.colors.primary}]}>
        <Text style={{color: theme.colors.accent}}>삭제</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartItemCard;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 14,
  },
  address: {
    marginTop: 4,
    fontSize: 13,
  },
  removeBtn: {
    marginTop: 12,
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
});
