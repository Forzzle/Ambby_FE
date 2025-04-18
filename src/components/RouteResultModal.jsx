import React from 'react';
import {Modal, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from '../contexts/themeContext';

const RouteResultModal = ({visible, onClose, routeData}) => {
  const {theme} = useTheme();

  if (!routeData) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View
          style={[
            styles.container,
            {backgroundColor: theme.colors.background},
          ]}>
          <Text style={[styles.title, {color: theme.colors.text}]}>
            🚗 최적 경로 결과
          </Text>
          {routeData.map((place, index) => (
            <Text key={place.id} style={{color: theme.colors.text}}>
              {index + 1}. {place.name}
            </Text>
          ))}

          <TouchableOpacity
            onPress={onClose}
            style={[styles.closeBtn, {backgroundColor: theme.colors.primary}]}>
            <Text style={{color: theme.colors.accent}}>닫기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default RouteResultModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    padding: 20,
    borderRadius: 10,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  closeBtn: {
    marginTop: 20,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
});
