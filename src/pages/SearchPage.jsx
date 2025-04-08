import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';

const SearchPage = () => {
  const [prompt, setPrompt] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://35.216.111.57:8080/api/gemini?prompt=${encodeURIComponent(prompt)}`);
      const result = await response.json();
      console.log('응답 데이터:', result);
      Alert.alert('응답 결과', result.data);
    } catch (error) {
      console.error('API 호출 에러:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={prompt}
        onChangeText={setPrompt}
        multiline
        placeholder={
          '가고 싶은 여행지를 문장으로 자유롭게 표현해 보세요!\n상세할수록 좋습니다'
        }
        accessibilityLabel="가고 싶은 여행지를 문장으로 자유롭게 표현해 보세요. 상세할수록 좋습니다"
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>검색하기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
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
