import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import Modal from 'react-native-modal';
import { X } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { Button } from './Button';

export interface Filters {
  priceRange: {
    min: number;
    max: number;
  };
  bedrooms: number;
  amenities: string[];
}

interface FiltersModalProps {
  isVisible: boolean;
  onClose: () => void;
  onApply: (filters: Filters) => void;
  initialFilters?: Filters;
}

const AMENITIES = [
  'Pool',
  'Gym',
  'WiFi',
  'Kitchen',
  'Free parking',
  'Air conditioning',
  'Washer',
  'Dryer',
  'TV',
  'Elevator',
];

const BEDROOM_OPTIONS = [1, 2, 3, 4, '5+'];

export const FiltersModal: React.FC<FiltersModalProps> = ({
  isVisible,
  onClose,
  onApply,
  initialFilters,
}) => {
  const [filters, setFilters] = useState<Filters>(
    initialFilters || {
      priceRange: { min: 0, max: 1000 },
      bedrooms: 1,
      amenities: [],
    }
  );

  const handleAmenityToggle = (amenity: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleBedroomSelect = (bedrooms: number) => {
    setFilters(prev => ({
      ...prev,
      bedrooms,
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
          <Text style={styles.title}>Filters</Text>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Price Range</Text>
            <View style={styles.priceInputs}>
              <Text style={styles.priceText}>
                ${filters.priceRange.min} - ${filters.priceRange.max}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bedrooms</Text>
            <View style={styles.bedroomOptions}>
              {BEDROOM_OPTIONS.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.bedroomButton,
                    filters.bedrooms === option && styles.bedroomButtonActive,
                  ]}
                  onPress={() => handleBedroomSelect(Number(option))}
                >
                  <Text
                    style={[
                      styles.bedroomButtonText,
                      filters.bedrooms === option && styles.bedroomButtonTextActive,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            {AMENITIES.map(amenity => (
              <View key={amenity} style={styles.amenityRow}>
                <Text style={styles.amenityText}>{amenity}</Text>
                <Switch
                  value={filters.amenities.includes(amenity)}
                  onValueChange={() => handleAmenityToggle(amenity)}
                  trackColor={{ false: colors.border, true: colors.primary }}
                />
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button onPress={() => onApply(filters)}>Apply Filters</Button>
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
    height: '90%',
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
  },
  section: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
  },
  priceInputs: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceText: {
    ...typography.body,
    color: colors.primary,
  },
  bedroomOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  bedroomButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    margin: spacing.xs,
  },
  bedroomButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  bedroomButtonText: {
    ...typography.body,
  },
  bedroomButtonTextActive: {
    color: colors.white,
  },
  amenityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  amenityText: {
    ...typography.body,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
}); 