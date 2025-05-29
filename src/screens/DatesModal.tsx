import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const DatesModal = () => {
  return (
    <View style={styles.container}>
      <Text>Select Dates Modal</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
});
