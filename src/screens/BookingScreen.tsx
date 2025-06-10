import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
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
import { Button } from '../components/Button';
import { DatesModal } from '../components/modals/DatesModal';
import { GuestsModal } from '../components/modals/GuestsModal';
import { RootStackParamList } from '../navigation/types';

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
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isGuestsModalVisible, setIsGuestsModalVisible] = useState(false);

  const handleDatePress = () => {
    setIsDatePickerVisible(true);
  };

  const handleGuestsPress = () => {
    setIsGuestsModalVisible(true);
  };

  const handlePaymentPress = () => {
    navigation.navigate('Wallet');
  };

  const handleConfirmBooking = async () => {
    if (!selectedDates.checkIn || !selectedDates.checkOut) {
      // TODO: Show error message
      return;
    }
    navigation.navigate('BookingConfirmation', {
      bookingId: 'temp-id', // This will be replaced with actual booking ID
      propertyId: route.params.propertyId,
    });
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatGuests = () => {
    const total = guests.adults + guests.children;
    let text = `${total} guest${total > 1 ? 's' : ''}`;
    if (guests.infants > 0) {
      text += `, ${guests.infants} infant${guests.infants > 1 ? 's' : ''}`;
    }
    return text;
  };

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
              <Text style={[styles.optionValue, { color: colors.textSecondary }]}>
                {selectedDates.checkIn && selectedDates.checkOut
                  ? `${formatDate(selectedDates.checkIn)} - ${formatDate(selectedDates.checkOut)}`
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
              <Text style={[styles.optionValue, { color: colors.textSecondary }]}>
                {formatGuests()}
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
              <Text style={[styles.optionValue, { color: colors.textSecondary }]}>
                Add payment method
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
            borderColor: colors.border,
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <Button
          onPress={handleConfirmBooking}
          disabled={!selectedDates.checkIn || !selectedDates.checkOut}
        >
          Confirm booking
        </Button>
      </View>

      <DatesModal
        isVisible={isDatePickerVisible}
        onClose={() => setIsDatePickerVisible(false)}
        onApply={(dates) => {
          setSelectedDates(dates);
          setIsDatePickerVisible(false);
        }}
        initialDates={selectedDates}
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
    height: 88,
    borderBottomWidth: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
  closeButton: {
    position: 'absolute',
    left: 24,
    bottom: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  optionIcon: {
    width: 40,
  },
  optionContent: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  optionValue: {
    fontSize: 14,
  },
  divider: {
    height: 8,
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
  },
});
