import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../contexts/themeContext';
import icons from '../constants/icons';

const SettingPage = () => {
  const navigation = useNavigation();
  const {theme} = useTheme();
  const styles = getStyles(theme);

  const menuItems = [
    {label: '색상 선택', route: 'ThemeSetting', iconKey: 'themeSetting'},
    {label: '시각 상태', route: 'VisionSetting', iconKey: 'visionSetting'},
    {label: '도움말', route: 'Help', iconKey: 'help'},
  ];
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {menuItems.map(item => (
          <TouchableOpacity
            key={item.route}
            style={styles.box}
            onPress={() => navigation.navigate(item.route)}>
            <View style={styles.iconContainer}>
              <Image source={icons[item.iconKey]} style={styles.icon} />
            </View>
            <Text style={styles.label}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default SettingPage;
const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 20,
      justifyContent: 'center',
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    box: {
      width: '48%',
      aspectRatio: 1,
      backgroundColor: theme.colors.primary,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    iconContainer: {
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      width: 32,
      height: 32,
      resizeMode: 'contain',
    },
    label: {
      color: theme.colors.secondary,
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 8,
    },
  });
