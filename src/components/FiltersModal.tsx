import React, { useState, useEffect } from 'react';
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
import { LucideX, LucideAlertCircle } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { Button } from './Button';
import { colors as themeColors } from '../theme/colors';

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
  initialFilters: Filters;
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

const BEDROOM_OPTIONS = ['1', '2', '3', '4', '5+'];

const AMENITY_CATEGORIES = {
  'Popular': [
    'WiFi',
    'Pool',
    'Kitchen',
    'Free parking',
    'Air conditioning',
  ],
  'Safety': [
    'Security cameras',
    'Smoke alarm',
    'Fire extinguisher',
    'First aid kit',
  ],
  'Features': [
    'Beachfront',
    'Waterfront',
    'Ski-in/ski-out',
    'Desert view',
  ],
};

export const FiltersModal: React.FC<FiltersModalProps> = ({
  isVisible,
  onClose,
  onApply,
  initialFilters,
}) => {
  const { colors } = useTheme();
  const [error, setError] = useState<Error | null>(null);
  const [priceRangeLocal, setPriceRangeLocal] = useState(initialFilters.priceRange);
  const [bedroomsLocal, setBedroomsLocal] = useState(initialFilters.bedrooms);
  const [amenitiesLocal, setAmenitiesLocal] = useState(initialFilters.amenities);

  useEffect(() => {
    try {
      if (isVisible) {
        setPriceRangeLocal(initialFilters.priceRange);
        setBedroomsLocal(initialFilters.bedrooms);
        setAmenitiesLocal(initialFilters.amenities);
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load filters'));
    }
  }, [isVisible, initialFilters]);

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    try {
      const numValue = parseInt(value) || 0;
      setPriceRangeLocal(prev => ({
        ...prev,
        [type]: numValue,
      }));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Invalid price value'));
    }
  };

  const handleBedroomSelect = (count: number) => {
    try {
      setBedroomsLocal(count);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update bedrooms'));
    }
  };

  const handleAmenityToggle = (amenity: string) => {
    try {
      setAmenitiesLocal(prev =>
        prev.includes(amenity)
          ? prev.filter(a => a !== amenity)
          : [...prev, amenity]
      );
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to toggle amenity'));
    }
  };

  const handleApply = () => {
    try {
      onApply({
        priceRange: priceRangeLocal,
        bedrooms: bedroomsLocal,
        amenities: amenitiesLocal,
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to apply filters'));
    }
  };

  const renderErrorState = () => (
    <View style={[styles.errorContainer, { backgroundColor: colors.background }]}>
      <LucideAlertCircle size={24} color={colors.error} />
      <Text style={[styles.errorText, { color: colors.error }]}>
        {error?.message || 'Something went wrong'}
      </Text>
      <Button onPress={onClose}>Close</Button>
    </View>
  );

  if (error) {
    return (
      <Modal
        isVisible={isVisible}
        onBackdropPress={onClose}
        style={styles.modal}
        backdropOpacity={0.5}
      >
        {renderErrorState()}
      </Modal>
    );
  }

  const renderAmenityCategory = (category: string, amenities: string[]) => (
    <View key={category} style={styles.categorySection}>
      <Text style={[styles.categoryTitle, { color: colors.text }]}>{category}</Text>
      {amenities.map(amenity => (
        <View key={amenity} style={styles.amenityRow}>
          <Text style={[styles.amenityText, { color: colors.text }]}>{amenity}</Text>
          <Switch
            value={amenitiesLocal.includes(amenity)}
            onValueChange={() => handleAmenityToggle(amenity)}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={amenitiesLocal.includes(amenity) ? colors.white : colors.surface}
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
      backdropOpacity={0.5}
      backdropColor={colors.black}
      statusBarTranslucent
      useNativeDriverForBackdrop
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <LucideX size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text }]}>Filters</Text>
        </View>

        <ScrollView style={styles.content}>
          <View style={[styles.section, { borderBottomColor: colors.border }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Price Range</Text>
            <View style={styles.priceInputs}>
              <View style={styles.priceInputContainer}>
                <Text style={[styles.priceLabel, { color: colors.textSecondary }]}>
                  Minimum
                </Text>
                <TextInput
                  style={[
                    styles.priceInput,
                    {
                      borderColor: colors.border,
                      color: colors.text,
                      backgroundColor: colors.surface,
                    }
                  ]}
                  value={priceRangeLocal.min.toString()}
                  onChangeText={(value) => handlePriceChange('min', value)}
                  keyboardType="numeric"
                  placeholder="Min price"
                  placeholderTextColor={colors.placeholder}
                />
              </View>
              <Text style={[styles.priceSeparator, { color: colors.textSecondary }]}>-</Text>
              <View style={styles.priceInputContainer}>
                <Text style={[styles.priceLabel, { color: colors.textSecondary }]}>
                  Maximum
                </Text>
                <TextInput
                  style={[
                    styles.priceInput,
                    {
                      borderColor: colors.border,
                      color: colors.text,
                      backgroundColor: colors.surface,
                    }
                  ]}
                  value={priceRangeLocal.max.toString()}
                  onChangeText={(value) => handlePriceChange('max', value)}
                  keyboardType="numeric"
                  placeholder="Max price"
                  placeholderTextColor={colors.placeholder}
                />
              </View>
            </View>
          </View>

          <View style={[styles.section, { borderBottomColor: colors.border }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Bedrooms</Text>
            <View style={styles.bedroomOptions}>
              {BEDROOM_OPTIONS.map((count) => (
                <TouchableOpacity
                  key={count}
                  style={[
                    styles.bedroomOption,
                    {
                      backgroundColor:
                        bedroomsLocal === Number(count) ? colors.primary : colors.surface,
                      borderColor: colors.border,
                    },
                  ]}
                  onPress={() => handleBedroomSelect(Number(count))}
                >
                  <Text
                    style={[
                      styles.bedroomOptionText,
                      {
                        color:
                          bedroomsLocal === Number(count) ? colors.white : colors.text,
                      },
                    ]}
                  >
                    {count}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Amenities
            </Text>
            {Object.entries(AMENITY_CATEGORIES).map(([category, amenities]) =>
              renderAmenityCategory(category, amenities)
            )}
          </View>
        </ScrollView>

        <View style={[styles.footer, { borderTopColor: colors.border }]}>
          <Button onPress={handleApply}>Apply filters</Button>
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
    height: '90%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
  },
  content: {
    flex: 1,
  },
  section: {
    padding: spacing.lg,
    borderBottomWidth: 1,
  },
  sectionTitle: {
    ...typography.h4,
    marginBottom: spacing.md,
  },
  priceInputs: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceInputContainer: {
    flex: 1,
  },
  priceLabel: {
    ...typography.bodySmall,
    marginBottom: spacing.xs,
  },
  priceInput: {
    ...typography.body,
    height: 44,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
  },
  priceSeparator: {
    ...typography.body,
    marginHorizontal: spacing.md,
  },
  bedroomOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  bedroomOption: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginHorizontal: spacing.xs,
    marginBottom: spacing.sm,
    minWidth: 60,
    alignItems: 'center',
  },
  bedroomOptionText: {
    ...typography.body,
  },
  categorySection: {
    marginBottom: spacing.lg,
  },
  categoryTitle: {
    ...typography.bodySmall,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  amenityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  amenityText: {
    ...typography.body,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
  },
  errorContainer: {
    padding: spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  errorText: {
    ...typography.body,
    textAlign: 'center',
    marginVertical: spacing.sm,
  },
}); 