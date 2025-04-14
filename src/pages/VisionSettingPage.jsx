import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useVision} from '../contexts/visionContext';
import {useNavigation} from '@react-navigation/native';

const visionOptions = ['비장애', '저시력', '전맹'];

const VisionSettingPage = () => {
  const {visionMode, updateVisionMode} = useVision(); //context로 관리
  const [selected, setSelected] = useState(visionMode);
  const navigation = useNavigation();

  const saveSelection = async () => {
    if (selected) {
      await updateVisionMode(selected);
      navigation.navigate('Search');
    }
  };

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
        onPress={saveSelection}
        disabled={!selected}>
        <Text style={styles.buttonText}>저장하기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VisionSettingPage;

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
