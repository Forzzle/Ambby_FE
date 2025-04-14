import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '../../context/ThemeContext';

const InfoTab = ({accessibilityInfo}) => {
  const {baseInfo, options} = accessibilityInfo;
  const {theme} = useTheme(); // 테마 정보 가져오는 거

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Text style={[styles.description, {color: theme.colors.text}]}>
        {baseInfo.description}
      </Text>
      <View>
        <Text style={[styles.title, {color: theme.colors.text}]}>
          휠체어 입구
        </Text>
        <Text style={[styles.content, {color: theme.colors.text}]}>
          {options.wheelchairAccessibleEntrance ? '있음' : '없음'}
        </Text>
      </View>
      <View>
        <Text style={[styles.title, {color: theme.colors.text}]}>
          장애인 주차장
        </Text>
        <Text style={[styles.content, {color: theme.colors.text}]}>
          {options.wheelchairAccessibleParking ? '있음' : '없음'}
        </Text>
      </View>
      <View>
        <Text style={[styles.title, {color: theme.colors.text}]}>
          휠체어 가능 자리
        </Text>
        <Text style={[styles.content, {color: theme.colors.text}]}>
          {options.wheelchairAccessibleSeating ? '있음' : '없음'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  content: {
    fontSize: 14,
  },
});

export default InfoTab;
