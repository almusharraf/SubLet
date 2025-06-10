import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { useTheme } from '../../theme/useTheme';
import { Button } from '../Button';

interface GuestsModalProps {
  isVisible: boolean;
  onClose: () => void;
  onApply: (guests: { adults: number; children: number; infants: number }) => void;
  initialGuests: {
    adults: number;
    children: number;
    infants: number;
  };
}

interface GuestTypeProps {
  label: string;
  description: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  minValue?: number;
}

const GuestType: React.FC<GuestTypeProps> = ({
  label,
  description,
  value,
  onIncrement,
  onDecrement,
  minValue = 0,
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.guestType}>
      <View style={styles.guestInfo}>
        <Text style={[styles.guestLabel, { color: colors.text }]}>{label}</Text>
        <Text style={[styles.guestDescription, { color: colors.textSecondary }]}>
          {description}
        </Text>
      </View>
      <View style={styles.guestControls}>
        <TouchableOpacity
          onPress={onDecrement}
          disabled={value <= minValue}
          style={[
            styles.controlButton,
            { borderColor: colors.border },
            value <= minValue && { opacity: 0.5 },
          ]}
        >
          <Text style={[styles.controlText, { color: colors.text }]}>−</Text>
        </TouchableOpacity>
        <Text style={[styles.guestCount, { color: colors.text }]}>{value}</Text>
        <TouchableOpacity
          onPress={onIncrement}
          style={[styles.controlButton, { borderColor: colors.border }]}
        >
          <Text style={[styles.controlText, { color: colors.text }]}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const GuestsModal: React.FC<GuestsModalProps> = ({
  isVisible,
  onClose,
  onApply,
  initialGuests,
}) => {
  const { colors } = useTheme();
  const [guests, setGuests] = useState(initialGuests);

  const updateGuests = (type: keyof typeof guests, value: number) => {
    setGuests(prev => ({ ...prev, [type]: value }));
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
      backdropTransitionOutTiming={0}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Guests</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={[styles.closeButton, { color: colors.text }]}>✕</Text>
          </TouchableOpacity>
        </View>

        <GuestType
          label="Adults"
          description="Ages 13 or above"
          value={guests.adults}
          onIncrement={() => updateGuests('adults', guests.adults + 1)}
          onDecrement={() => updateGuests('adults', guests.adults - 1)}
          minValue={1}
        />

        <GuestType
          label="Children"
          description="Ages 2-12"
          value={guests.children}
          onIncrement={() => updateGuests('children', guests.children + 1)}
          onDecrement={() => updateGuests('children', guests.children - 1)}
        />

        <GuestType
          label="Infants"
          description="Under 2"
          value={guests.infants}
          onIncrement={() => updateGuests('infants', guests.infants + 1)}
          onDecrement={() => updateGuests('infants', guests.infants - 1)}
        />

        <View style={styles.footer}>
          <Button onPress={() => onApply(guests)}>
            Apply
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
  },
  closeButton: {
    fontSize: 24,
    fontWeight: '400',
  },
  guestType: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  guestInfo: {
    flex: 1,
  },
  guestLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  guestDescription: {
    fontSize: 14,
  },
  guestControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlText: {
    fontSize: 20,
    fontWeight: '300',
  },
  guestCount: {
    fontSize: 16,
    marginHorizontal: 16,
  },
  footer: {
    marginTop: 24,
  },
}); 