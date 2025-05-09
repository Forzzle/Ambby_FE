import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useVision} from '../../contexts/visionContext';
import {useTheme} from '../../contexts/themeContext';
import Header from '../../components/Header';
import icons from '../../constants/icons';
import {SafeAreaView} from 'react-native-safe-area-context';

const visionOptions = [
  {key: '비장애', label: '비장애'},
  {key: '저시력', label: '저시력'},
  {key: '전맹', label: '전맹'},
];

const VisionSettingPage = () => {
  const {theme} = useTheme();
  const {visionMode, updateVisionMode} = useVision();
  const styles = getStyles(theme);

  const handleSelect = async option => {
    await updateVisionMode(option);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header title={'시각 상태 설정'} icon={'none'} height={140} />

        <View style={styles.gridContainer}>
          {visionOptions.map(option => {
            const isSelected = visionMode === option.key;
            return (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.button,
                  {backgroundColor: theme.colors.primary},
                  isSelected && styles.selectedBorder,
                ]}
                onPress={() => handleSelect(option.key)}>
                <View style={styles.iconWrapper}>
                  <Image style={styles.icon} source={icons.visionSetting} />
                </View>
                <Text style={styles.label}>{option.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>{' '}
    </SafeAreaView>
  );
};

export default VisionSettingPage;

const getStyles = theme =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.primary,
    },
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    gridContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between', // <-- 좌우 여백 균등하게
      paddingHorizontal: 20, // <-- 양옆 패딩
      marginTop: 20,
    },
    button: {
      width: '47%', // <-- 2열, 살짝 간격 있게
      aspectRatio: 1, // 정사각형
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    selectedBorder: {
      borderWidth: 3,
      borderColor: theme.colors.secondary, // 선택 시 secondary 색 테두리
    },
    iconWrapper: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#ffffff80',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
    icon: {
      width: 24,
      height: 24,
      resizeMode: 'contain',
      tintColor: '#000',
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.textOnPrimary,
    },
  });
