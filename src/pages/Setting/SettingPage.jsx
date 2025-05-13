import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../contexts/themeContext';
import {useAutoPlay} from '../../contexts/AutoPlayContext';
import icons from '../../constants/icons';

const SettingPage = () => {
  const navigation = useNavigation();
  const {theme} = useTheme();
  const {autoPlayEnabled, toggleAutoPlay} = useAutoPlay();
  const styles = getStyles(theme);

  const menuItems = [
    {label: '색상 선택', route: 'ThemeSetting', iconKey: 'themeSetting'},
    {label: '시각 상태', route: 'VisionSetting', iconKey: 'visionSetting'},
    {label: '도움말', route: 'Help', iconKey: 'help'},
  ];

  const handleSoundButtonPress = () => {
    toggleAutoPlay();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.grid}>
          {menuItems.map(item => (
            <TouchableOpacity
              key={item.route}
              style={styles.box}
              onPress={() => navigation.navigate(item.route)}>
              <Image source={icons[item.iconKey]} style={styles.icon} />
              <Text style={styles.label}>{item.label}</Text>
            </TouchableOpacity>
          ))}

          {/* 소리 버튼 */}
          <TouchableOpacity
            style={[
              styles.box,
              {
                backgroundColor: autoPlayEnabled
                  ? theme.colors.secondary
                  : theme.colors.primary,
              },
            ]}
            onPress={handleSoundButtonPress}>
            <Image
              source={autoPlayEnabled ? icons.soundOn : icons.soundOff}
              style={[
                styles.icon,
                {
                  tintColor: autoPlayEnabled
                    ? theme.colors.primary
                    : theme.colors.secondary,
                },
              ]}
            />
            <Text
              style={[
                styles.label,
                {
                  color: autoPlayEnabled
                    ? theme.colors.primary
                    : theme.colors.textOnPrimary,
                },
              ]}>
              {autoPlayEnabled ? '자동재생 켜짐' : '자동재생 꺼짐'}{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingPage;

const getStyles = theme =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 20,
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
      padding: 12,
      gap: 10,
    },
    label: {
      color: theme.colors.textOnPrimary,
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 8,
    },
    icon: {
      resizeMode: 'contain',
      tintColor: theme.colors.secondary,
      width: 28,
      height: 28,
    },
  });
