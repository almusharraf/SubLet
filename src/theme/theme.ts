import { Platform } from 'react-native';

// Color palette
const palette = {
  blue: {
    50: '#EBF5FF',
    100: '#E1EFFE',
    500: '#3399FF',
    600: '#0066FF',
    700: '#0052CC',
  },
  gray: {
    50: '#F8F9FA',
    100: '#F1F3F5',
    200: '#E9ECEF',
    300: '#DEE2E6',
    400: '#CED4DA',
    500: '#ADB5BD',
    600: '#868E96',
    700: '#495057',
    800: '#343A40',
    900: '#212529',
  },
  green: {
    500: '#12B76A',
    600: '#039855',
  },
  red: {
    500: '#F04438',
    600: '#D92D20',
  },
  yellow: {
    500: '#F79009',
    600: '#DC6803',
  },
  white: '#FFFFFF',
  black: '#000000',
};

// Spacing system
export const spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  screenPadding: 16,
  headerHeight: 44, // Standard header height
};

// Typography system
export const typography = {
  h1: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700' as const,
    letterSpacing: -0.2,
  },
  h2: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700' as const,
    letterSpacing: -0.1,
  },
  h3: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600' as const,
    letterSpacing: -0.1,
  },
  h4: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600' as const,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400' as const,
  },
  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400' as const,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as const,
  },
  button: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600' as const,
  },
  buttonSmall: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600' as const,
  },
};

// Elevation/Shadow system
export const elevation = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  small: Platform.select({
    ios: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
    },
    android: {
      elevation: 2,
    },
  }),
  medium: Platform.select({
    ios: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
    },
    android: {
      elevation: 4,
    },
  }),
  large: Platform.select({
    ios: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.16,
      shadowRadius: 16,
    },
    android: {
      elevation: 8,
    },
  }),
};

// Border Radius system
export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
};

// Theme colors
export const lightTheme = {
  // Base
  background: palette.white,
  surface: palette.gray[50],
  card: palette.white,
  
  // Text
  text: palette.gray[900],
  textSecondary: palette.gray[600],
  textTertiary: palette.gray[500],
  
  // Brand
  primary: palette.blue[600],
  primaryDark: palette.blue[700],
  primaryLight: palette.blue[500],
  
  // UI Elements
  border: palette.gray[200],
  divider: palette.gray[100],
  placeholder: palette.gray[500],
  icon: palette.gray[700],
  input: palette.white,
  
  // Overlays
  modalBackground: 'rgba(0, 0, 0, 0.5)',
  overlay: 'rgba(0, 0, 0, 0.4)',
  
  // Status
  success: palette.green[500],
  error: palette.red[500],
  warning: palette.yellow[500],
  
  // Special
  shadow: 'rgba(0, 0, 0, 0.08)',
  chatBubble: palette.blue[50],
  chatBubbleUser: palette.blue[600],

  // System colors
  white: palette.white,
  black: palette.black,
};

export const darkTheme = {
  // Base
  background: palette.black,
  surface: '#111111',
  card: '#1A1A1A',
  
  // Text
  text: palette.white,
  textSecondary: palette.gray[400],
  textTertiary: palette.gray[500],
  
  // Brand
  primary: palette.blue[500],
  primaryDark: palette.blue[600],
  primaryLight: palette.blue[400],
  
  // UI Elements
  border: '#2A2A2A',
  divider: '#222222',
  placeholder: palette.gray[500],
  icon: palette.gray[300],
  input: '#222222',
  
  // Overlays
  modalBackground: 'rgba(0, 0, 0, 0.8)',
  overlay: 'rgba(0, 0, 0, 0.6)',
  
  // Status
  success: palette.green[500],
  error: palette.red[500],
  warning: palette.yellow[500],
  
  // Special
  shadow: 'rgba(0, 0, 0, 0.2)',
  chatBubble: '#222222',
  chatBubbleUser: palette.blue[600],

  // System colors
  white: palette.white,
  black: palette.black,
};

// Theme interface
export interface Theme {
  background: string;
  surface: string;
  card: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  primary: string;
  primaryDark: string;
  primaryLight: string;
  border: string;
  divider: string;
  placeholder: string;
  icon: string;
  input: string;
  modalBackground: string;
  overlay: string;
  success: string;
  error: string;
  warning: string;
  shadow: string;
  chatBubble: string;
  chatBubbleUser: string;
  white: string;
  black: string;
}

export type ThemeType = 'light' | 'dark'; 