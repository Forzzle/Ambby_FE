import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const visionOptions = ['비장애', '저시력', '전맹'];

const VisionSettingScreen = () => {
  const [selected, setSelected] = useState(null);
  const navigation = useNavigation();

  const saveSelection = async value => {
    try {
      await AsyncStorage.setItem('visionSetting', value);
      navigation.navigate('Search');
    } catch (e) {
      console.error('설정 저장 실패', e);
    }
  };

  const loadSelection = async () => {
    try {
      const value = await AsyncStorage.getItem('visionSetting');
      if (value !== null) {
        setSelected(value);
      }
    } catch (e) {
      console.error('설정 불러오기 실패', e);
    }
  };

  useEffect(() => {
    loadSelection();
  }, []);

  return (
    <View style={styles.container}>
      {visionOptions.map(option => (
        <TouchableOpacity
          key={option}
          style={[styles.option, selected === option && styles.selectedOption]}
          onPress={() => setSelected(option)}>
          <Text
            style={[
              styles.optionText,
              selected === option && styles.selectedText,
            ]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={styles.button}
        onPress={() => saveSelection(selected)}
        disabled={!selected}>
        <Text style={styles.buttonText}>저장하기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VisionSettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  option: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    marginBottom: 12,
  },
  selectedOption: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#222',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
