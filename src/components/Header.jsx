import React from 'react';
import {View, Text, StyleSheet, Platform, StatusBar, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../contexts/themeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = ({
  title,
  showBack = true,
  icon = null,
  height = 60,
  titleSize = 16,
}) => {
  const navigation = useNavigation();
  const {theme} = useTheme();
  const styles = getStyles(theme, height, titleSize);

  return (
    <View style={styles.container}>
      {showBack ? (
        <View style={styles.backBtn} onTouchEnd={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back"
            size={24}
            color={theme.colors.textOnPrimary}
          />
        </View>
      ) : (
        <View style={styles.backBtn} />
      )}

      <View style={styles.centerContent}>
        {icon === 'none' ? (
          <View style={styles.iconWrapper} />
        ) : icon ? (
          <View style={styles.iconWrapper}>
            <Image style={styles.icon} source={icon} />
          </View>
        ) : (
          <View />
        )}
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.backBtn} />
    </View>
  );
};

const getStyles = (theme, height, titleSize) =>
  StyleSheet.create({
    container: {
      height: height,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      backgroundColor: theme.colors.primary,
      flexDirection: 'row',
      paddingHorizontal: 16,
    },
    backBtn: {
      width: 40,
      height: 40,

      marginTop: 18,
    },
    centerContent: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: titleSize,
      fontWeight: 'bold',
      color: theme.colors.textOnPrimary,
    },
    iconWrapper: {
      backgroundColor: theme.colors.secondary,
      width: 50,
      height: 50,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12,
    },
    icon: {
      width: 32,
      height: 32,
      resizeMode: 'contain',
      tintColor: theme.colors.primary,
    },
  });

export default Header;
