export const colors = {
  // Primary colors
  primary: '#FF385C',
  primaryDark: '#E31C5F',
  primaryLight: '#FF5A5F',
  
  // Neutrals
  black: '#222222',
  darkGray: '#484848',
  gray: '#717171',
  lightGray: '#B0B0B0',
  border: '#DDDDDD',
  background: '#F7F7F7',
  white: '#FFFFFF',
  
  // Status colors
  success: '#008A05',
  error: '#FF0000',
  warning: '#FFB400',
  
  // Special colors
  link: '#006C70',
  overlay: 'rgba(0, 0, 0, 0.4)',
  
  // Neutral shades
  neutral50: '#FAFAFA',
  neutral100: '#F5F5F5',
  neutral200: '#EEEEEE',
  neutral300: '#E0E0E0',
  neutral400: '#BDBDBD',
  neutral500: '#9E9E9E',
  neutral600: '#757575',
  neutral700: '#616161',
  neutral800: '#424242',
  neutral900: '#212121',
  
  // Additional UI colors
  shadow: 'rgba(0, 0, 0, 0.1)',
} as const;

export type ColorType = keyof typeof colors; 