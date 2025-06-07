import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeContext';
import type { RootStackNavigationProp } from '../navigation/types';

interface SearchBarProps {
  value?: string;
  onChangeText?: (text: string) => void;
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ placeholder }: SearchBarProps) => {
  const { colors } = useTheme();
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <Pressable
      style={[styles.container, { backgroundColor: colors.card }]}
      onPress={() => navigation.navigate('SearchModal')}
    >
      <Text style={[styles.placeholder, { color: colors.textSecondary }]}>
        {placeholder}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    borderRadius: 24,
    paddingHorizontal: 16,
    justifyContent: 'center',
    marginHorizontal: 24,
    marginVertical: 8,
  },
  placeholder: {
    fontSize: 16,
  },
}); 