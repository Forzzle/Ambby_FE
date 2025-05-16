import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../contexts/themeContext';
import icons from '../constants/icons';

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

  const isTallHeader = height > 60;

  return (
    <View style={styles.container}>
      {showBack ? (
        <TouchableOpacity
          style={[styles.sideBtn, isTallHeader && styles.sideBtnTop]}
          onPress={() => navigation.goBack()}>
          <Image style={styles.backIcon} source={icons.back} />
        </TouchableOpacity>
      ) : (
        <View style={styles.sideBtn} />
      )}

      <View style={styles.centerContent}>
        {icon === 'none' ? (
          <View style={styles.iconWrapper} />
        ) : icon ? (
          <View style={styles.iconWrapper}>
            <Image style={styles.icon} source={icon} />
          </View>
        ) : null}
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.sideBtn} />
    </View>
  );
};

const getStyles = (theme, height, titleSize) =>
  StyleSheet.create({
    container: {
      height,
      backgroundColor: theme.colors.primary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
    },
    sideBtn: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sideBtnTop: {
      alignSelf: 'flex-start',
      marginTop: 20,
    },
    centerContent: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
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
      marginBottom: 6,
    },
    icon: {
      width: 32,
      height: 32,
      resizeMode: 'contain',
      tintColor: theme.colors.primary,
    },
    backIcon: {
      width: 24,
      height: 24,
      resizeMode: 'contain',
      tintColor: theme.colors.textOnPrimary,
    },
  });

export default Header;
