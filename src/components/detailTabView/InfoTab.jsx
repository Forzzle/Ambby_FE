import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '../../contexts/themeContext';

const InfoTab = ({accessibilityInfo}) => {
  const {baseInfo, options} = accessibilityInfo;
  const {theme} = useTheme(); // 테마 정보 가져오는 거

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Text style={[styles.description, {color: theme.colors.primary}]}>
        정보 미정
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16,
    flex: 1,
  },
  description: {
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
