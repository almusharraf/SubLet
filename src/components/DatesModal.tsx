import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import { X } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { Button } from './Button';

export interface DateRange {
  checkIn: Date | null;
  checkOut: Date | null;
}

interface DatesModalProps {
  isVisible: boolean;
  onClose: () => void;
  onApply: (dates: DateRange) => void;
  initialDates?: DateRange;
}

export const DatesModal: React.FC<DatesModalProps> = ({
  isVisible,
  onClose,
  onApply,
  initialDates,
}) => {
  const [selectedDates, setSelectedDates] = useState<DateRange>(
    initialDates || {
      checkIn: null,
      checkOut: null,
    }
  );

  const formatDate = (date: Date | null) => {
    if (!date) return 'Select date';
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // TODO: Implement calendar component
  // For now, using dummy dates for demonstration
  const handleDateSelect = (type: 'checkIn' | 'checkOut') => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    setSelectedDates(prev => ({
      ...prev,
      [type]: type === 'checkIn' ? today : tomorrow,
    }));
  };

  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      swipeDirection={['down']}
      style={styles.modal}
      propagateSwipe
      backdropOpacity={0.3}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color={colors.black} />
          </TouchableOpacity>
          <Text style={styles.title}>Select Dates</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.dateSection}>
            <Text style={styles.sectionTitle}>Check-in</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => handleDateSelect('checkIn')}
            >
              <Text style={styles.dateText}>
                {formatDate(selectedDates.checkIn)}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dateSection}>
            <Text style={styles.sectionTitle}>Check-out</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => handleDateSelect('checkOut')}
            >
              <Text style={styles.dateText}>
                {formatDate(selectedDates.checkOut)}
              </Text>
            </TouchableOpacity>
          </View>

          {/* TODO: Add calendar component here */}
        </View>

        <View style={styles.footer}>
          <Button
            onPress={() => onApply(selectedDates)}
            disabled={!selectedDates.checkIn || !selectedDates.checkOut}
          >
            Apply Dates
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
    backgroundColor: colors.white,
    height: '70%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  closeButton: {
    position: 'absolute',
    left: spacing.lg,
    padding: spacing.xs,
  },
  title: {
    ...typography.h3,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  dateSection: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.bodySmall,
    color: colors.gray,
    marginBottom: spacing.xs,
  },
  dateButton: {
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
  },
  dateText: {
    ...typography.body,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
}); 