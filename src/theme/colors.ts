export const colors = {
  // Base colors
  primary: '#1C9BEF', // Brand blue
  primaryDark: '#1A8CD8',
  primaryLight: '#4CB3F4',
  white: '#FFFFFF',
  black: '#000000',
  
  // Status colors
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  star: '#F59E0B',
  
  // Map colors
  mapMarker: '#1C9BEF',
  mapMarkerSelected: '#1A8CD8',
  
  // Light theme
  light: {
    background: '#FFFFFF',
    surface: '#F7F7F7',
    card: '#FFFFFF',
    text: '#222222',
    textSecondary: '#717171',
    border: '#DDDDDD',
    divider: '#EBEBEB',
    placeholder: '#717171',
    icon: '#222222',
    shadow: 'rgba(0, 0, 0, 0.1)',
    input: '#FFFFFF',
    modalBackground: 'rgba(0, 0, 0, 0.6)',
    buttonText: '#FFFFFF',
  },
  
  // Dark theme
  dark: {
    background: '#000000',
    surface: '#1E293B',
    card: '#111827',
    text: '#FFFFFF',
    textSecondary: '#94A3B8',
    border: '#1E293B',
    divider: '#1E293B',
    placeholder: '#94A3B8',
    icon: '#FFFFFF',
    shadow: 'rgba(0, 0, 0, 0.3)',
    input: '#1E293B',
    modalBackground: 'rgba(0, 0, 0, 0.8)',
    buttonText: '#FFFFFF',
  },
  
  // Special colors
  overlay: 'rgba(0, 0, 0, 0.4)',
  transparent: 'transparent',
  
  // Social colors
  facebook: '#1877F2',
  google: '#4285F4',
  apple: '#000000',
} as const;

export type ColorType = keyof typeof colors;
export type ThemeColors = typeof colors.light | typeof colors.dark; 