import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { Calendar } from 'react-native-calendars';
import { useTheme } from '../../theme/useTheme';
import { Button } from '../Button';

interface DatesModalProps {
  isVisible: boolean;
  onClose: () => void;
  onApply: (dates: { checkIn: Date | null; checkOut: Date | null }) => void;
  initialDates?: {
    checkIn: Date | null;
    checkOut: Date | null;
  };
}

export const DatesModal: React.FC<DatesModalProps> = ({
  isVisible,
  onClose,
  onApply,
  initialDates,
}) => {
  const { colors } = useTheme();
  const [selectedStartDate, setSelectedStartDate] = useState<string | null>(
    initialDates?.checkIn ? initialDates.checkIn.toISOString().split('T')[0] : null
  );
  const [selectedEndDate, setSelectedEndDate] = useState<string | null>(
    initialDates?.checkOut ? initialDates.checkOut.toISOString().split('T')[0] : null
  );

  const handleDayPress = (day: { dateString: string }) => {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      // Start new selection
      setSelectedStartDate(day.dateString);
      setSelectedEndDate(null);
    } else {
      // Complete the range
      if (day.dateString < selectedStartDate) {
        setSelectedStartDate(day.dateString);
        setSelectedEndDate(selectedStartDate);
      } else {
        setSelectedEndDate(day.dateString);
      }
    }
  };

  const getMarkedDates = () => {
    const marked: any = {};
    if (selectedStartDate) {
      marked[selectedStartDate] = {
        startingDay: true,
        color: colors.primary,
        textColor: 'white',
      };
    }
    if (selectedEndDate) {
      marked[selectedEndDate] = {
        endingDay: true,
        color: colors.primary,
        textColor: 'white',
      };
    }
    if (selectedStartDate && selectedEndDate) {
      let currentDate = new Date(selectedStartDate);
      const endDate = new Date(selectedEndDate);
      while (currentDate < endDate) {
        currentDate.setDate(currentDate.getDate() + 1);
        const dateString = currentDate.toISOString().split('T')[0];
        if (dateString !== selectedEndDate) {
          marked[dateString] = {
            color: colors.primary + '40',
            textColor: colors.text,
          };
        }
      }
    }
    return marked;
  };

  const handleApply = () => {
    onApply({
      checkIn: selectedStartDate ? new Date(selectedStartDate) : null,
      checkOut: selectedEndDate ? new Date(selectedEndDate) : null,
    });
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
          <Text style={[styles.title, { color: colors.text }]}>Select dates</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={[styles.closeButton, { color: colors.text }]}>✕</Text>
          </TouchableOpacity>
        </View>

        <Calendar
          onDayPress={handleDayPress}
          markedDates={getMarkedDates()}
          markingType="period"
          theme={{
            calendarBackground: colors.background,
            textSectionTitleColor: colors.text,
            selectedDayBackgroundColor: colors.primary,
            selectedDayTextColor: '#ffffff',
            todayTextColor: colors.primary,
            dayTextColor: colors.text,
            textDisabledColor: colors.textSecondary,
            monthTextColor: colors.text,
            arrowColor: colors.text,
          }}
        />

        <View style={styles.footer}>
          <Button
            onPress={handleApply}
            disabled={!selectedStartDate || !selectedEndDate}
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
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '90%',
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
  footer: {
    marginTop: 24,
  },
});
