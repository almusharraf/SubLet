import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import { LucideX, LucideMinus, LucidePlus } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { Button } from './Button';

interface GuestsModalProps {
  isVisible: boolean;
  onClose: () => void;
  onApply: (guests: Guests) => void;
  initialGuests?: Guests;
}

interface Guests {
  adults: number;
  children: number;
  infants: number;
}

export const GuestsModal: React.FC<GuestsModalProps> = ({
  isVisible,
  onClose,
  onApply,
  initialGuests,
}) => {
  const { colors } = useTheme();
  const [guests, setGuests] = useState<Guests>(
    initialGuests || {
      adults: 1,
      children: 0,
      infants: 0,
    }
  );

  const handleIncrement = (type: keyof Guests) => {
    setGuests(prev => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  const handleDecrement = (type: keyof Guests) => {
    if (type === 'adults' && guests[type] <= 1) return;
    if (guests[type] <= 0) return;

    setGuests(prev => ({
      ...prev,
      [type]: prev[type] - 1,
    }));
  };

  const renderCounter = (
    type: keyof Guests,
    label: string,
    description: string,
    max: number
  ) => (
    <View style={[styles.row, { borderColor: colors.border }]}>
      <View style={styles.rowContent}>
        <Text style={[styles.rowTitle, { color: colors.text }]}>
          {label}
        </Text>
        <Text style={[styles.rowDescription, { color: colors.textSecondary }]}>
          {description}
        </Text>
      </View>
      <View style={styles.counter}>
        <TouchableOpacity
          style={[
            styles.counterButton,
            { borderColor: colors.border },
            guests[type] <= (type === 'adults' ? 1 : 0) && styles.counterButtonDisabled,
          ]}
          onPress={() => handleDecrement(type)}
          disabled={guests[type] <= (type === 'adults' ? 1 : 0)}
        >
          <LucideMinus
            size={20}
            color={colors.text}
            style={guests[type] <= (type === 'adults' ? 1 : 0) && { opacity: 0.5 }}
          />
        </TouchableOpacity>
        <Text style={[styles.counterText, { color: colors.text }]}>
          {guests[type]}
        </Text>
        <TouchableOpacity
          style={[
            styles.counterButton,
            { borderColor: colors.border },
            guests[type] >= max && styles.counterButtonDisabled,
          ]}
          onPress={() => handleIncrement(type)}
          disabled={guests[type] >= max}
        >
          <LucidePlus
            size={20}
            color={colors.text}
            style={guests[type] >= max && { opacity: 0.5 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

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
            Who's coming?
          </Text>
        </View>

        <ScrollView style={styles.content}>
          {renderCounter(
            'adults',
            'Adults',
            'Ages 13 or above',
            16
          )}
          {renderCounter(
            'children',
            'Children',
            'Ages 2-12',
            8
          )}
          {renderCounter(
            'infants',
            'Infants',
            'Under 2',
            5
          )}
        </ScrollView>

        <View style={[styles.footer, { borderColor: colors.border }]}>
          <Button
            onPress={() => {
              onApply(guests);
              onClose();
            }}
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
  },
  rowContent: {
    flex: 1,
    marginRight: spacing.lg,
  },
  rowTitle: {
    ...typography.body,
    marginBottom: spacing.xs,
  },
  rowDescription: {
    ...typography.bodySmall,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterButtonDisabled: {
    opacity: 0.5,
  },
  counterText: {
    ...typography.body,
    marginHorizontal: spacing.md,
    minWidth: 24,
    textAlign: 'center',
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
  },
}); 