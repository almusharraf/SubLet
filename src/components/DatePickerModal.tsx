import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import { LucideX } from 'lucide-react-native';
import { Calendar } from 'react-native-calendars';
import { useTheme } from '../theme/useTheme';
import { spacing, typography } from '../theme/theme';
import { Button } from './Button';

interface DatePickerModalProps {
  isVisible: boolean;
  onClose: () => void;
  onApply: (dates: { checkIn: Date; checkOut: Date }) => void;
  initialDates?: { checkIn: Date; checkOut: Date };
}

export const DatePickerModal: React.FC<DatePickerModalProps> = ({
  isVisible,
  onClose,
  onApply,
  initialDates,
}) => {
  const { colors } = useTheme();
  const [selectedDates, setSelectedDates] = React.useState<{
    checkIn: Date | null;
    checkOut: Date | null;
  }>({
    checkIn: initialDates?.checkIn || null,
    checkOut: initialDates?.checkOut || null,
  });

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getMarkedDates = () => {
    const markedDates: any = {};

    if (selectedDates.checkIn) {
      markedDates[formatDate(selectedDates.checkIn)] = {
        startingDay: true,
        color: colors.primary,
        textColor: colors.white,
      };
    }

    if (selectedDates.checkOut) {
      markedDates[formatDate(selectedDates.checkOut)] = {
        endingDay: true,
        color: colors.primary,
        textColor: colors.white,
      };

      // Mark dates in between
      if (selectedDates.checkIn) {
        const start = selectedDates.checkIn.getTime();
        const end = selectedDates.checkOut.getTime();
        for (let t = start; t <= end; t += 24 * 60 * 60 * 1000) {
          const date = formatDate(new Date(t));
          if (!markedDates[date]) {
            markedDates[date] = {
              color: colors.primary,
              textColor: colors.white,
            };
          }
        }
      }
    }

    return markedDates;
  };

  const handleDayPress = (day: any) => {
    const selectedDate = new Date(day.dateString);

    if (!selectedDates.checkIn || (selectedDates.checkIn && selectedDates.checkOut)) {
      setSelectedDates({
        checkIn: selectedDate,
        checkOut: null,
      });
    } else {
      if (selectedDate < selectedDates.checkIn) {
        setSelectedDates({
          checkIn: selectedDate,
          checkOut: selectedDates.checkIn,
        });
      } else {
        setSelectedDates({
          checkIn: selectedDates.checkIn,
          checkOut: selectedDate,
        });
      }
    }
  };

  const handleApply = () => {
    if (selectedDates.checkIn && selectedDates.checkOut) {
      onApply({
        checkIn: selectedDates.checkIn,
        checkOut: selectedDates.checkOut,
      });
    }
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
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { borderColor: colors.border }]}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <LucideX size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text }]}>
            Select dates
          </Text>
        </View>

        <View style={styles.content}>
          <Calendar
            markingType="period"
            markedDates={getMarkedDates()}
            onDayPress={handleDayPress}
            theme={{
              calendarBackground: colors.background,
              textSectionTitleColor: colors.textSecondary,
              selectedDayBackgroundColor: colors.primary,
              selectedDayTextColor: '#FFFFFF',
              todayTextColor: colors.primary,
              dayTextColor: colors.text,
              textDisabledColor: colors.textSecondary,
              monthTextColor: colors.text,
              arrowColor: colors.text,
            }}
          />
        </View>

        <View style={[styles.footer, { borderColor: colors.border }]}>
          <View style={styles.dateDisplay}>
            <Text style={[styles.dateLabel, { color: colors.textSecondary }]}>
              {selectedDates.checkIn
                ? selectedDates.checkIn.toLocaleDateString()
                : 'Check-in'}
              {' → '}
              {selectedDates.checkOut
                ? selectedDates.checkOut.toLocaleDateString()
                : 'Check-out'}
            </Text>
          </View>
          <Button
            onPress={handleApply}
            disabled={!selectedDates.checkIn || !selectedDates.checkOut}
          >
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
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
  },
  closeButton: {
    marginRight: spacing.md,
  },
  title: {
    ...typography.h3,
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
  },
  dateDisplay: {
    marginBottom: spacing.md,
  },
  dateLabel: {
    ...typography.body,
    textAlign: 'center',
  },
}); 