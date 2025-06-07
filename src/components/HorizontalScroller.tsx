import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { spacing } from '../theme/spacing';

export const HorizontalScroller = (props) => {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: spacing.lg }}
      ItemSeparatorComponent={() => <View style={{ width: spacing.md }} />}
      {...props}
    />
  );
}; 