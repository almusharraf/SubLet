import { useContext } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeContext } from './ThemeContext';
import { lightTheme, darkTheme, Theme } from './theme';
import { colors } from './colors';

interface ThemeColors {
  background: string;
  surface: string;
  card: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  border: string;
  divider: string;
  placeholder: string;
  icon: string;
  shadow: string;
  input: string;
  modalBackground: string;
  buttonText: string;
  primary: string;
  error: string;
  primaryDark: string;
  primaryLight: string;
  warning: string;
  chatBubble: string;
  chatBubbleUser: string;
}

// Ensure all required theme colors are present
const fallbackColors: ThemeColors = {
  background: '#FFFFFF',
  surface: '#F7F7F7',
  card: '#FFFFFF',
  text: '#000000',
  textSecondary: '#666666',
  textTertiary: '#999999',
  primary: '#1C9BEF',
  primaryDark: '#1A8CD8',
  primaryLight: '#4CB3F4',
  border: '#E5E5E5',
  divider: '#F0F0F0',
  placeholder: '#999999',
  icon: '#000000',
  input: '#FFFFFF',
  modalBackground: 'rgba(0, 0, 0, 0.5)',
  overlay: 'rgba(0, 0, 0, 0.4)',
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  shadow: 'rgba(0, 0, 0, 0.1)',
  chatBubble: '#F0F0F0',
  chatBubbleUser: '#1C9BEF',
  buttonText: '#FFFFFF',
};

// Default theme values as a safe fallback
const defaultThemeValues = {
  theme: 'light' as const,
  isDark: false,
  colors: fallbackColors,
  toggleTheme: () => {},
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  if (!context) {
    console.warn('useTheme must be used within ThemeProvider');
    // Provide safe fallback based on system color scheme
    return {
      ...defaultThemeValues,
      theme: colorScheme || 'light',
      isDark: colorScheme === 'dark',
      colors: {
        ...colors[isDark ? 'dark' : 'light'],
        primary: colors.primary,
        error: colors.error,
      } as ThemeColors,
    };
  }

  // Ensure all theme colors are present
  const colors = {
    ...fallbackColors,
    ...(context.isDark ? darkTheme : lightTheme),
  } as ThemeColors;

  return {
    ...context,
    colors,
  };
};

// Helper to safely access theme colors with fallbacks
export const useThemeColor = (
  colorKey: keyof ThemeColors,
  fallback?: string
): string => {
  const { colors } = useTheme();
  return colors[colorKey] ?? fallback ?? fallbackColors[colorKey];
};

// Helper to get style objects with safe color access
export const useThemedStyles = (
  styleGenerator: (colors: ThemeColors) => Record<string, any>
) => {
  const { colors } = useTheme();
  return styleGenerator(colors);
};

// Utility to safely get a theme color with fallback
export const getSafeThemeColor = (colors: ThemeColors | undefined, key: keyof ThemeColors): string => {
  if (!colors) {
    console.warn(`Theme colors undefined when accessing ${key}`);
    return fallbackColors[key];
  }
  return colors[key] ?? fallbackColors[key];
}; 