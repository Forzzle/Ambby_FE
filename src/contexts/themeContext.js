import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

const themes = {
  default: {
    label: '파랑 ㅣ 노랑',
    colors: {
      background: '#F5F9FF',
      primary: '#306DEE',
      textPrimary: '#222222',
      textOnPrimary: '#ffffff',
      secondary: '#FFFA6E',
      accent: '#C9DBFF',
      disabled: '#B0B0B0',
      placeholder: '#D7E1F5',
    },
  },
  greenOrange: {
    label: '초록 ㅣ 주황',
    colors: {
      background: '#FFF7E7',
      primary: '#0F4F31',
      textPrimary: '#222222',
      textOnPrimary: '#ffffff',
      secondary: '#E54A29',
      accent: '#FFD5A2',
      disabled: '#B0B0B0',
      placeholder: '#F7D4CC',
    },
  },
  whiteBlack: {
    label: '흰색 ㅣ 검정',
    colors: {
      background: '#ffffff',
      primary: '#000000',
      textPrimary: '#000000',
      textOnPrimary: '#ffffff',
      secondary: '#ffffff',
      accent: '#373737',
      disabled: '#B0B0B0',
      placeholder: '#B0B0B0',
    },
  },
};

export const ThemeProvider = ({children}) => {
  const [themeKey, setThemeKey] = useState('default');

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('themeKey');
      if (storedTheme) {
        setThemeKey(storedTheme);
      }
    };
    loadTheme();
  }, []);

  const setThemeByKey = async key => {
    if (themes[key]) {
      setThemeKey(key);
      await AsyncStorage.setItem('themeKey', key);
    }
  };

  const theme = themes[themeKey];

  const descriptions = {
    default:
      '파랑 ㅣ 노랑 테마의 경우, 적록색약자, 황녹색약자들을 위한 테마입니다.',
    greenOrange:
      '주황 ㅣ 초록 테마의 경우, 적록색약자, 황녹색약자들을 위한 테마입니다.',
    whiteBlack:
      '검정 ㅣ 흰색 테마의 경우, 적록색약자, 황녹색약자들을 위한 테마입니다.',
  };

  return (
    <ThemeContext.Provider
      value={{theme, setThemeByKey, themeKey, themes, descriptions}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
