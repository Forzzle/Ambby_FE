import React, {createContext, useContext, useState} from 'react';

const ThemeContext = createContext();

const themes = {
  default: {
    mode: 'light',
    colors: {
      background: '#ffffff',
      text: '#000000',
      primary: '#222222',
      accent: '#ffffff',
      border: '#aaaaaa',
      placeholder: '#888888',
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
  const theme = themes[themeKey];

  const setThemeByKey = key => {
    if (themes[key]) {
      setThemeKey(key);
    }
  };

  return (
    <ThemeContext.Provider value={{theme, setThemeByKey, themeKey}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
