import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  SafeAreaView,
} from 'react-native';

import {useTheme} from '../../contexts/themeContext';
import Header from '../../components/Header';
import icons from '../../constants/icons';

const ThemeSettingPage = () => {
  const {setThemeByKey, themeKey, themes, descriptions} = useTheme();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const currentTheme = themes[themeKey];
  const styles = getStyles(currentTheme);

  const openModal = key => {
    setModalContent(descriptions[key]);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header title={'색상 선택'} icon={'none'} height={140} />
        <View style={styles.content}>
          {Object.entries(themes).map(([key, theme]) => {
            const isSelected = key === themeKey;
            return (
              <View key={key} style={styles.previewWrapper}>
                <TouchableOpacity
                  style={[
                    styles.previewButton,
                    {backgroundColor: theme.colors.primary},
                    isSelected && styles.selectedBorder,
                  ]}
                  onPress={() => setThemeByKey(key)}>
                  <View
                    style={[
                      styles.iconWrapper,
                      {
                        backgroundColor:
                          theme.colors.secondary || theme.colors.accent,
                      },
                    ]}>
                    <Image
                      style={[styles.icon, {tintColor: theme.colors.primary}]}
                      source={icons.visionOn}
                    />
                  </View>
                  <Text style={styles.previewLabel}>{theme.label}</Text>

                  <TouchableOpacity
                    style={styles.infoButton}
                    onPress={() => openModal(key)}>
                    <Text style={styles.infoText}>!</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        <Modal
          transparent
          visible={modalVisible}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>누가 이 테마를 쓰면 좋나요?</Text>
              <Text style={styles.modalText}>{modalContent}</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeBtn}>
                <Text style={styles.closeBtnText}>X</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default ThemeSettingPage;

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
    content: {
      flex: 1,
      justifyContent: 'center',
    },
    previewWrapper: {
      marginHorizontal: 30,
      marginVertical: 10,
    },
    previewButton: {
      borderRadius: 10,
      padding: 12,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    selectedBorder: {
      borderWidth: 2,
      borderColor: '#ffffff',
    },
    previewLabel: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#ffffff',
    },
    iconWrapper: {
      width: 70,
      height: 70,
      borderRadius: 35,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12,
    },
    icon: {
      width: 32,
      height: 32,
      resizeMode: 'contain',
    },
    infoButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    infoText: {
      color: '#333',
      fontWeight: 'bold',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: theme.colors.primary,
      padding: 20,
      borderRadius: 10,
      width: '80%',
      alignItems: 'center',
    },
    modalTitle: {
      fontWeight: 'bold',
      color: theme.colors.textOnPrimary,
      fontSize: 16,
      marginTop: 20,
      textAlign: 'center',
    },
    modalText: {
      color: theme.colors.textOnPrimary,
      fontSize: 16,
      marginVertical: 20,
      textAlign: 'center',
    },
    closeBtn: {
      position: 'absolute',
      top: 10,
      right: 10,
      zIndex: 10,
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.secondary,
      borderRadius: '50%',
    },
    closeBtnText: {
      fontSize: 14,
      color: theme.colors.primary,
    },
  });
