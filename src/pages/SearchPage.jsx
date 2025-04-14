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
import {useTheme} from '../context/ThemeContext';

const SearchPage = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const {theme} = useTheme(); // ✅ 테마 정보 가져오기

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
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.background,
            color: theme.colors.text,
            borderColor: theme.colors.border,
          },
        ]}
        value={prompt}
        onChangeText={setPrompt}
        multiline
        placeholder={
          '가고 싶은 여행지를 문장으로 자유롭게 표현해 보세요!\n상세할수록 좋습니다'
        }
        accessibilityLabel="가고 싶은 여행지를 문장으로 자유롭게 표현해 보세요. 상세할수록 좋습니다"
        placeholderTextColor={theme.colors.placeholder}
      />

      <TouchableOpacity
        style={[styles.button, {backgroundColor: theme.colors.primary}]}
        onPress={handleSearch}>
        <Text style={[styles.buttonText, {color: theme.colors.accent}]}>
          검색하기
        </Text>
      </TouchableOpacity>
      {loading && (
        <Text style={{marginTop: 10, color: theme.colors.text}}>
          검색중입니다..
        </Text>
      )}
    </View>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
});
