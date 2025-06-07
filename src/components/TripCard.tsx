import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import type { RootStackNavigationProp } from '../navigation/types';

export const TripCard = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <Pressable
      style={[styles.container, { backgroundColor: colors.card }]}
      onPress={() => navigation.navigate('TripsScreen')}
    >
      <View style={styles.content}>
        <View style={styles.textColumn}>
          <Text style={[styles.title, { color: colors.text }]}>
            View details of your trip
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            May 15 - May 20 • 2 guests
          </Text>
        </View>
        <View style={styles.rightColumn}>
          <View style={[styles.iconContainer, { backgroundColor: colors.primary }]}>
            <Ionicons name="calendar" size={32} color={colors.surface} />
          </View>
          <Text style={[styles.daysText, { color: colors.textSecondary }]}>
            Starts in 7 days
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginVertical: 16,
    borderRadius: 16,
    padding: 16,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textColumn: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  rightColumn: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 55,
    height: 55,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  daysText: {
    fontSize: 12,
  },
}); 