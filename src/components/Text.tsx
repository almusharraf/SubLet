import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

interface TextProps extends RNTextProps {
  children: React.ReactNode;
}

export function Text({ children, style, ...props }: TextProps) {
  return (
    <RNText style={[{ color: '#000' }, style]} {...props}>
      {children}
    </RNText>
  );
} 