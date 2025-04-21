import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Dimensions,
  Pressable,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {searchPlaces} from '../apis/placeApi';
import {useTheme} from '../contexts/themeContext';
import icons from '../constants/icons';
import Loading from '../components/Loading';

const screenWidth = Dimensions.get('window').width;
const circleSize = screenWidth * 0.7;

const SearchPage = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');

  const {theme} = useTheme();
  const styles = getStyles(theme);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await searchPlaces(prompt);
      navigation.push('SearchResult', {
        data: res.data,
        query: prompt,
      });
      console.log('검색 결과:', res);
    } catch (error) {
      console.log('API 호출 에러:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <Text style={styles.title}>
            {'가고싶은 여행지를 \n 자유롭게 표현해보세요!'}
          </Text>
          <Text style={styles.subTitle}>상세할수록 좋습니다.</Text>

          <Pressable style={styles.inputContainer}>
            <TouchableOpacity style={styles.searchIcon} onPress={handleSearch}>
              <Image source={icons.search} />
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              value={prompt}
              onChangeText={setPrompt}
              returnKeyType="search"
              onSubmitEditing={handleSearch}
              placeholder={
                '가고 싶은 여행지를 문장으로 자유롭게 표현해 보세요!\n상세할수록 좋습니다'
              }
              blurOnSubmit={true}
              multiline
              accessibilityLabel="가고 싶은 여행지를 문장으로 자유롭게 표현해 보세요. 상세할수록 좋습니다"
              placeholderTextColor={theme.colors.placeholder}
              textAlign="center"
            />
          </Pressable>

          {loading && <Loading />}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      backgroundColor: theme.colors.primary,
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    title: {
      color: theme.colors.text,
      fontSize: 20,
      fontWeight: 800,
      alignSelf: 'flex-start',
      lineHeight: 30,
      marginBottom: 10,
    },
    subTitle: {
      color: theme.colors.text,
      fontSize: 16,
      alignSelf: 'flex-start',
      marginBottom: 50,
    },
    inputContainer: {
      width: circleSize,
      height: circleSize,
      borderRadius: circleSize / 2,
      backgroundColor: theme.colors.secondary,
      paddingTop: 40,
      alignItems: 'center',
      marginBottom: 40,
    },
    searchIcon: {
      backgroundColor: theme.colors.primary,
      width: 50,
      height: 50,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      width: '80%',
      padding: 10,
      paddingTop: 20,
      fontSize: 16,
      textAlign: 'center',
      color: theme.colors.primary,
      fontWeight: 800,
      lineHeight: 28,
      maxHeight: circleSize - 120,
    },
    button: {
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 10,
      backgroundColor: theme.colors.primary,
    },
    buttonText: {
      fontSize: 16,
      color: theme.colors.accent,
    },
    loadingText: {
      marginTop: 10,
      color: theme.colors.text,
      textAlign: 'center',
    },
  });

export default SearchPage;
