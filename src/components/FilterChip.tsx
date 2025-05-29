import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

interface FilterChipProps {
  label: string;
  isSelected?: boolean;
  onPress: () => void;
}

export const FilterChip: React.FC<FilterChipProps> = ({ 
  label, 
  isSelected = false, 
  onPress 
}) => {
  return (
    <Pressable 
      style={[styles.container, isSelected && styles.selected]}
      onPress={onPress}
    >
      <Text style={[styles.label, isSelected && styles.selectedLabel]}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    backgroundColor: '#F7F7F7',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#EBEBEB',
  },
  selected: {
    backgroundColor: '#222222',
  },
  label: {
    fontSize: 14,
    color: '#222222',
    fontWeight: '500',
  },
  selectedLabel: {
    color: '#FFFFFF',
  },
}); 