import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

const themes = {
  default: {
    mode: 'light',
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
  yellowBlack: {
    mode: 'highContrast',
    colors: {
      background: '#000000',
      text: '#FFD700',
      primary: '#FFD700',
      accent: '#000000',
      border: '#FFD700',
      placeholder: '#FFD700',
    },
  },
  redCyan: {
    mode: 'highContrast',
    colors: {
      background: '#B21212',
      text: '#B7E2E9',
      primary: '#B7E2E9',
      accent: '#B21212',
      border: '#B7E2E9',
      placeholder: '#B7E2E9',
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
      await AsyncStorage.setItem('themeKey', key); // Save the selected theme to AsyncStorage
    }
  };

  const theme = themes[themeKey];

  return (
    <ThemeContext.Provider value={{theme, setThemeByKey, themeKey}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
