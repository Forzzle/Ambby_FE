import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../contexts/themeContext';

const themePresets = [
  {
    key: 'default',
    colors: ['#fff', '#000'],
    label: '기본 모드',
  },
  {
    key: 'yellowBlack',
    colors: ['#000', '#FFD700'],
    label: '검정/노랑',
  },
  {
    key: 'redCyan',
    colors: ['#B21212', '#B7E2E9'],
    label: '빨강/청록',
  },
];

const ThemeSettingPage = () => {
  const navigation = useNavigation();
  const {theme, setThemeByKey, themeKey} = useTheme();

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Text style={[styles.title, {color: theme.colors.text}]}>
        🎨 테마 설정
      </Text>

      {themePresets.map(preset => (
        <TouchableOpacity
          key={preset.key}
          style={[
            styles.previewButton,
            {
              borderColor:
                themeKey === preset.key ? theme.colors.primary : '#ccc',
            },
          ]}
          onPress={() => setThemeByKey(preset.key)}>
          <View style={styles.previewColors}>
            <View
              style={[
                styles.colorHalf,
                {
                  backgroundColor: preset.colors[0],
                  borderTopLeftRadius: 6,
                  borderBottomLeftRadius: 6,
                },
              ]}
            />
            <View
              style={[
                styles.colorHalf,
                {
                  backgroundColor: preset.colors[1],
                  borderTopRightRadius: 6,
                  borderBottomRightRadius: 6,
                },
              ]}
            />
          </View>
          <Text style={[styles.previewLabel, {color: theme.colors.text}]}>
            {preset.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ThemeSettingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  previewButton: {
    borderWidth: 2,
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  previewColors: {
    flexDirection: 'row',
    width: 120,
    height: 40,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  colorHalf: {
    flex: 1,
  },
  previewLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
