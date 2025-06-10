import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { lightTheme, darkTheme, Theme, ThemeType } from './theme';

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
  isDark: boolean;
  colors: Theme;
}

// Default theme values
const defaultTheme: ThemeContextType = {
  theme: 'light',
  toggleTheme: () => {},
  isDark: false,
  colors: lightTheme,
};

export const ThemeContext = createContext<ThemeContextType>(defaultTheme);

const THEME_STORAGE_KEY = '@sublet_theme_preference';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<ThemeType>(systemColorScheme || 'light');

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        setTheme(savedTheme);
      } else {
        setTheme(systemColorScheme || 'light');
        // Save the system preference as initial value
        await AsyncStorage.setItem(THEME_STORAGE_KEY, systemColorScheme || 'light');
      }
    } catch (error) {
      console.warn('Failed to load theme:', error);
      setTheme(systemColorScheme || 'light');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    // Update state immediately for better UX
    setTheme(newTheme);
    
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
      // Theme is already toggled in memory, so no need to revert
    }
  };

  // Get theme colors with fallback
  const themeColors = theme === 'dark' ? darkTheme : lightTheme;

  const contextValue = {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
    colors: themeColors,
  };

  // While loading, return default theme to prevent undefined values
  if (isLoading) {
    return (
      <ThemeContext.Provider value={defaultTheme}>
        <StatusBar style="dark" />
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext };

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    console.warn('useTheme must be used within a ThemeProvider');
    return defaultTheme;
  }
  return context;
}; 