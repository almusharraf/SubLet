import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  TextInput,
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

const AMENITY_CATEGORIES = {
  'Essential': [
    'WiFi',
    'Kitchen',
    'Air conditioning',
    'Heating',
    'Washer',
  ],
  'Features': [
    'Pool',
    'Hot tub',
    'Free parking',
    'EV charger',
    'Gym',
  ],
  'Safety': [
    'Smoke alarm',
    'Carbon monoxide alarm',
    'Fire extinguisher',
    'First aid kit',
    'Security cameras',
  ],
};

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

  const [priceRangeLocal, setPriceRangeLocal] = useState({
    min: filters.priceRange.min,
    max: filters.priceRange.max,
  });

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const numValue = parseInt(value) || 0;
    setPriceRangeLocal(prev => ({
      ...prev,
      [type]: numValue,
    }));
  };

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

  const handleApply = () => {
    setFilters(prev => ({
      ...prev,
      priceRange: priceRangeLocal,
    }));
    onApply({
      ...filters,
      priceRange: priceRangeLocal,
    });
  };

  const renderAmenityCategory = (category: string, amenities: string[]) => (
    <View key={category} style={styles.categorySection}>
      <Text style={styles.categoryTitle}>{category}</Text>
      {amenities.map(amenity => (
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
              <View style={styles.priceInputContainer}>
                <Text style={styles.priceLabel}>Minimum</Text>
                <TextInput
                  style={styles.priceInput}
                  value={priceRangeLocal.min.toString()}
                  onChangeText={(value) => handlePriceChange('min', value)}
                  keyboardType="numeric"
                  placeholder="Min price"
                />
              </View>
              <Text style={styles.priceSeparator}>-</Text>
              <View style={styles.priceInputContainer}>
                <Text style={styles.priceLabel}>Maximum</Text>
                <TextInput
                  style={styles.priceInput}
                  value={priceRangeLocal.max.toString()}
                  onChangeText={(value) => handlePriceChange('max', value)}
                  keyboardType="numeric"
                  placeholder="Max price"
                />
              </View>
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
            {Object.entries(AMENITY_CATEGORIES).map(([category, amenities]) =>
              renderAmenityCategory(category, amenities)
            )}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button onPress={handleApply}>Apply Filters</Button>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  priceInputContainer: {
    flex: 1,
  },
  priceLabel: {
    ...typography.caption,
    color: colors.gray,
    marginBottom: spacing.xs,
  },
  priceInput: {
    ...typography.body,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    textAlign: 'center',
  },
  priceSeparator: {
    ...typography.body,
    marginHorizontal: spacing.md,
    color: colors.gray,
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
  categorySection: {
    marginBottom: spacing.lg,
  },
  categoryTitle: {
    ...typography.h4,
    marginBottom: spacing.sm,
  },
}); 