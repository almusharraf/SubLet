import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  LucideCalendar,
  LucideUsers,
  LucideCreditCard,
  LucideX,
} from 'lucide-react-native';
import { useTheme } from '../theme/useTheme';
import { spacing, typography } from '../theme/theme';
import { Button } from '../components/Button';
import { GuestsModal } from '../components/GuestsModal';
import { DatePickerModal } from '../components/DatePickerModal';
import { RootStackParamList } from '../navigation/types';
import { properties } from '../data/properties';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RoutePropType = RouteProp<RootStackParamList, 'Booking'>;

interface Guests {
  adults: number;
  children: number;
  infants: number;
}

interface SelectedDates {
  checkIn: Date | null;
  checkOut: Date | null;
}

export const BookingScreen: React.FC<{
  route: RoutePropType;
  navigation: NavigationProp;
}> = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const [selectedDates, setSelectedDates] = useState<SelectedDates>({
    checkIn: route.params.dates?.checkIn || null,
    checkOut: route.params.dates?.checkOut || null,
  });
  const [guests, setGuests] = useState<Guests>({ adults: 1, children: 0, infants: 0 });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isGuestsModalVisible, setIsGuestsModalVisible] = useState(false);

  const property = properties.find(p => p.id === route.params.propertyId);

  if (!property) {
    return null;
  }

  const handleDatePress = () => {
    setIsDatePickerVisible(true);
  };

  const handleGuestsPress = () => {
    setIsGuestsModalVisible(true);
  };

  const handlePaymentPress = () => {
    navigation.navigate('Wallet');
  };

  const handleConfirmBooking = () => {
    if (!selectedDates.checkIn || !selectedDates.checkOut) {
      Alert.alert('Error', 'Please select your dates');
      return;
    }

    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      Alert.alert(
        'Booking Confirmed!',
        'Your reservation has been confirmed. You can view the details in your trips.',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('MainTabs');
            },
          },
        ]
      );
    }, 1500);
  };

  const getTotalNights = () => {
    if (!selectedDates.checkIn || !selectedDates.checkOut) return 0;
    const checkIn = selectedDates.checkIn;
    const checkOut = selectedDates.checkOut;
    return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  };

  const totalNights = getTotalNights();
  const subtotal = property.price * totalNights;
  const serviceFee = Math.round(subtotal * 0.12);
  const total = subtotal + serviceFee;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.background,
            borderColor: colors.border,
            paddingTop: insets.top,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <LucideX size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Confirm and pay
        </Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Your trip
          </Text>

          <TouchableOpacity
            style={[styles.option, { borderColor: colors.border }]}
            onPress={handleDatePress}
          >
            <View style={styles.optionIcon}>
              <LucideCalendar size={24} color={colors.text} />
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.optionLabel, { color: colors.text }]}>
                Dates
              </Text>
              <Text
                style={[styles.optionValue, { color: colors.textSecondary }]}
              >
                {selectedDates.checkIn && selectedDates.checkOut
                  ? `${selectedDates.checkIn.toLocaleDateString()} - ${selectedDates.checkOut.toLocaleDateString()}`
                  : 'Add dates'}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.option, { borderColor: colors.border }]}
            onPress={handleGuestsPress}
          >
            <View style={styles.optionIcon}>
              <LucideUsers size={24} color={colors.text} />
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.optionLabel, { color: colors.text }]}>
                Guests
              </Text>
              <Text
                style={[styles.optionValue, { color: colors.textSecondary }]}
              >
                {guests.adults + guests.children} guests
                {guests.infants > 0 ? `, ${guests.infants} infants` : ''}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Payment
          </Text>

          <TouchableOpacity
            style={[styles.option, { borderColor: colors.border }]}
            onPress={handlePaymentPress}
          >
            <View style={styles.optionIcon}>
              <LucideCreditCard size={24} color={colors.text} />
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.optionLabel, { color: colors.text }]}>
                Payment method
              </Text>
              <Text
                style={[styles.optionValue, { color: colors.textSecondary }]}
              >
                Add payment method
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Price details
          </Text>

          <View style={styles.priceRow}>
            <Text style={[styles.priceLabel, { color: colors.text }]}>
              ﷼{property.price} × {totalNights} nights
            </Text>
            <Text style={[styles.priceValue, { color: colors.text }]}>
              ﷼{subtotal}
            </Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={[styles.priceLabel, { color: colors.text }]}>
              Service fee
            </Text>
            <Text style={[styles.priceValue, { color: colors.text }]}>
              ﷼{serviceFee}
            </Text>
          </View>

          <View style={[styles.totalRow, { borderColor: colors.border }]}>
            <Text style={[styles.totalLabel, { color: colors.text }]}>
              Total
            </Text>
            <Text style={[styles.totalValue, { color: colors.text }]}>
              ﷼{total}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
            borderColor: colors.border,
            paddingBottom: insets.bottom || spacing.lg,
          },
        ]}
      >
        <Button onPress={handleConfirmBooking} loading={isProcessing}>
          Confirm booking
        </Button>
      </View>

      <DatePickerModal
        isVisible={isDatePickerVisible}
        onClose={() => setIsDatePickerVisible(false)}
        onApply={(dates) => {
          setSelectedDates({
            checkIn: dates.checkIn,
            checkOut: dates.checkOut,
          });
          setIsDatePickerVisible(false);
        }}
        initialDates={selectedDates.checkIn && selectedDates.checkOut ? {
          checkIn: selectedDates.checkIn,
          checkOut: selectedDates.checkOut,
        } : undefined}
      />

      <GuestsModal
        isVisible={isGuestsModalVisible}
        onClose={() => setIsGuestsModalVisible(false)}
        onApply={(newGuests) => {
          setGuests(newGuests);
          setIsGuestsModalVisible(false);
        }}
        initialGuests={guests}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: spacing.headerHeight + 44,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingHorizontal: spacing.lg,
  },
  closeButton: {
    marginRight: spacing.md,
  },
  headerTitle: {
    ...typography.h3,
    flex: 1,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  optionIcon: {
    width: 40,
    alignItems: 'center',
  },
  optionContent: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  optionLabel: {
    ...typography.body,
    marginBottom: spacing.xs,
  },
  optionValue: {
    ...typography.bodySmall,
  },
  divider: {
    height: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  priceLabel: {
    ...typography.body,
  },
  priceValue: {
    ...typography.body,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: spacing.md,
    marginTop: spacing.md,
    borderTopWidth: 1,
  },
  totalLabel: {
    ...typography.h3,
  },
  totalValue: {
    ...typography.h3,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
  },
});
