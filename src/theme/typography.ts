import { TextStyle } from 'react-native';
import { colors } from './colors';

export const typography = {
  // Font families
  regular: 'System',
  medium: 'System',
  bold: 'System',

  // Font sizes
  h1: {
    fontSize: 32,
    lineHeight: 38,
    fontFamily: 'System',
    fontWeight: '700',
    color: colors.black,
  } as TextStyle,

  h2: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: 'System',
    fontWeight: '600',
    color: colors.black,
  } as TextStyle,

  h3: {
    fontSize: 20,
    lineHeight: 28,
    fontFamily: 'System',
    fontWeight: '600',
    color: colors.black,
  } as TextStyle,

  body: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'System',
    fontWeight: '400',
    color: colors.black,
  } as TextStyle,

  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'System',
    fontWeight: '400',
    color: colors.gray,
  } as TextStyle,

  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'System',
    fontWeight: '400',
    color: colors.gray,
  } as TextStyle,

  button: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'System',
    fontWeight: '600',
    color: colors.white,
  } as TextStyle,
} as const;

export type TypographyType = keyof typeof typography; 