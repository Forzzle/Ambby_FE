import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {searchPlaces} from '../apis/placeApi';

const SearchPage = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await searchPlaces(prompt);
      navigation.navigate('SearchResult', {data: res.data, query: prompt});
    } catch (error) {
      console.error('API 호출 에러:', error);
    } finally {
      setLoading(false);
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('VisionSetting')}>
        <Text style={styles.buttonText}>시각정보 설정</Text>
      </TouchableOpacity>
      {loading && <Text style={{marginTop: 10}}>검색중입니다..</Text>}
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
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
