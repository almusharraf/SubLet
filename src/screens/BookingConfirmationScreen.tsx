import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useTheme } from '../theme/useTheme';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { Text } from '../components/Text';
import { LucideCheck, LucideCalendar, LucideUsers, LucideMapPin } from 'lucide-react-native';
import { Button } from '../components/Button';
import { format } from 'date-fns';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RoutePropType = RouteProp<RootStackParamList, 'BookingConfirmation'>;

export const BookingConfirmationScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  const { colors } = useTheme();

  // In a real app, we would fetch these details from Firestore
  const bookingDetails = {
    propertyTitle: 'Luxury Apartment',
    location: 'Al Olaya, Riyadh',
    checkIn: new Date('2024-03-20'),
    checkOut: new Date('2024-04-20'),
    guests: 2,
    totalPrice: 9000,
    bookingId: route.params.bookingId,
  };

  const handleViewTrips = () => {
    navigation.navigate('MainTabs', {
      screen: 'Profile',
      params: {
        screen: 'ProfileHome',
        params: { initialTab: 'trips' },
      },
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <View style={styles.successIcon}>
            <LucideCheck size={32} color={colors.primary} />
          </View>

          <Text style={[styles.title, { color: colors.text }]}>
            Booking Confirmed!
          </Text>
          
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Your booking has been confirmed. You can view all the details in your trips.
          </Text>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <LucideMapPin size={20} color={colors.textSecondary} />
              <View style={styles.detailTexts}>
                <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
                  Property
                </Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>
                  {bookingDetails.propertyTitle}
                </Text>
                <Text style={[styles.detailSubvalue, { color: colors.textSecondary }]}>
                  {bookingDetails.location}
                </Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <LucideCalendar size={20} color={colors.textSecondary} />
              <View style={styles.detailTexts}>
                <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
                  Dates
                </Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>
                  {format(bookingDetails.checkIn, 'MMM d')} - {format(bookingDetails.checkOut, 'MMM d, yyyy')}
                </Text>
                <Text style={[styles.detailSubvalue, { color: colors.textSecondary }]}>
                  30 nights
                </Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <LucideUsers size={20} color={colors.textSecondary} />
              <View style={styles.detailTexts}>
                <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
                  Guests
                </Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>
                  {bookingDetails.guests} guests
                </Text>
              </View>
            </View>

            <View style={[styles.priceContainer, { borderTopColor: colors.border }]}>
              <Text style={[styles.priceLabel, { color: colors.text }]}>
                Total Price
              </Text>
              <Text style={[styles.priceValue, { color: colors.text }]}>
                ﷼{bookingDetails.totalPrice.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button onPress={handleViewTrips}>
          View My Trips
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
  card: {
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  successIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h2,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  divider: {
    height: 1,
    marginVertical: spacing.lg,
  },
  detailsContainer: {
    gap: spacing.lg,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  detailTexts: {
    flex: 1,
  },
  detailLabel: {
    ...typography.caption,
    marginBottom: spacing.xs,
  },
  detailValue: {
    ...typography.subtitle,
    marginBottom: spacing.xs,
  },
  detailSubvalue: {
    ...typography.caption,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.lg,
    marginTop: spacing.lg,
    borderTopWidth: 1,
  },
  priceLabel: {
    ...typography.subtitle,
  },
  priceValue: {
    ...typography.h3,
  },
  footer: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
}); 