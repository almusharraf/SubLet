import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../types/navigation';

type BookingScreenRouteProp = RouteProp<RootStackParamList, 'Booking'>;

export const BookingScreen = () => {
  const route = useRoute<BookingScreenRouteProp>();
  const { propertyId } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Confirm your booking</Text>
        <Text style={styles.propertyId}>Property ID: {propertyId}</Text>
        
        <Pressable style={styles.confirmButton}>
          <Text style={styles.confirmButtonText}>Confirm and pay</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 16,
  },
  propertyId: {
    fontSize: 16,
    color: '#717171',
    marginBottom: 24,
  },
  confirmButton: {
    backgroundColor: '#FF385C',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
