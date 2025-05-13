import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../contexts/themeContext';

const ListCard = ({item, showDelete = false, onDelete}) => {
  const navigation = useNavigation();
  const {theme} = useTheme();
  const styles = getStyles(theme);

  const accessibilityLabel = `${item.name}, ${item.category}. 주소는 ${item.simpleAddress}입니다. `;

  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', {placeId: item.id})}
        style={styles.content}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityHint="장소 상세 페이지로 이동합니다">
        <View style={styles.textContainer}>
          <View style={styles.row}>
            <Text
              style={styles.title}
              accessible={false} // 이미 위에서 접근성 텍스트 제공하므로 중복 방지
            >
              {item.name}
            </Text>
            <Text
              style={styles.category}
              numberOfLines={1}
              ellipsizeMode="tail"
              accessible={false}>
              {item.category}
            </Text>
          </View>
          <Text style={styles.address} accessible={false}>
            {item.simpleAddress}
          </Text>
        </View>
      </TouchableOpacity>

      {showDelete && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete?.(item.id)}
          accessibilityRole="button"
          accessibilityLabel={`${item.name} 삭제 버튼`}
          accessibilityHint="이 장소를 리스트에서 삭제합니다">
          <Text style={styles.deleteText} accessible={false}>
            ×
          </Text>
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
