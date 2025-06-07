import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LucideX } from 'lucide-react-native';
import { useTheme, useThemeColor } from '../theme/useTheme';
import { spacing, typography } from '../theme/theme';
import { Button } from '../components/Button';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface PropertyType {
  id: string;
  label: string;
  isSelected: boolean;
}

interface Amenity {
  id: string;
  label: string;
  isSelected: boolean;
}

const propertyTypes: PropertyType[] = [
  { id: '1', label: 'House', isSelected: false },
  { id: '2', label: 'Apartment', isSelected: false },
  { id: '3', label: 'Villa', isSelected: false },
  { id: '4', label: 'Condo', isSelected: false },
];

const amenities: Amenity[] = [
  { id: '1', label: 'WiFi', isSelected: false },
  { id: '2', label: 'Pool', isSelected: false },
  { id: '3', label: 'Kitchen', isSelected: false },
  { id: '4', label: 'Parking', isSelected: false },
];

export const FiltersScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<PropertyType[]>(propertyTypes);
  const [selectedAmenities, setSelectedAmenities] = useState<Amenity[]>(amenities);
  const [instantBook, setInstantBook] = useState(false);

  const handlePropertyTypeSelect = (id: string) => {
    setSelectedPropertyTypes(prev =>
      prev.map(type =>
        type.id === id ? { ...type, isSelected: !type.isSelected } : type
      )
    );
  };

  const handleAmenitySelect = (id: string) => {
    setSelectedAmenities(prev =>
      prev.map(amenity =>
        amenity.id === id ? { ...amenity, isSelected: !amenity.isSelected } : amenity
      )
    );
  };

  const handleApply = () => {
    // TODO: Apply filters and navigate back
    navigation.goBack();
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
          Filters
        </Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Price range
          </Text>
          <View style={styles.priceInputs}>
            <Text style={[styles.priceText, { color: colors.text }]}>
              ${priceRange.min} - ${priceRange.max}
            </Text>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Property type
          </Text>
          <View style={styles.optionsGrid}>
            {selectedPropertyTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.optionButton,
                  {
                    backgroundColor: type.isSelected
                      ? colors.primary
                      : colors.surface,
                    borderColor: type.isSelected
                      ? colors.primary
                      : colors.border,
                  },
                ]}
                onPress={() => handlePropertyTypeSelect(type.id)}
              >
                <Text
                  style={[
                    styles.optionText,
                    {
                      color: type.isSelected
                        ? colors.white
                        : colors.text,
                    },
                  ]}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Amenities
          </Text>
          {selectedAmenities.map((amenity) => (
            <TouchableOpacity
              key={amenity.id}
              style={[styles.amenityRow, { borderColor: colors.border }]}
              onPress={() => handleAmenitySelect(amenity.id)}
            >
              <Text style={[styles.amenityText, { color: colors.text }]}>
                {amenity.label}
              </Text>
              <Switch
                value={amenity.isSelected}
                onValueChange={() => handleAmenitySelect(amenity.id)}
                trackColor={{ false: colors.border, true: colors.primary }}
              />
            </TouchableOpacity>
          ))}
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <View style={styles.section}>
          <View style={styles.instantBookRow}>
            <View style={styles.instantBookContent}>
              <Text style={[styles.instantBookTitle, { color: colors.text }]}>
                Instant Book
              </Text>
              <Text
                style={[styles.instantBookDescription, { color: colors.textSecondary }]}
              >
                Book without waiting for host approval
              </Text>
            </View>
            <Switch
              value={instantBook}
              onValueChange={setInstantBook}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: colors.background, borderColor: colors.border }]}>
        <Button onPress={handleApply} variant="primary">
          Apply filters
        </Button>
      </View>
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
  priceInputs: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceText: {
    ...typography.h2,
  },
  divider: {
    height: 1,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  optionButton: {
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    margin: spacing.xs,
  },
  optionText: {
    ...typography.body,
  },
  amenityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  amenityText: {
    ...typography.body,
  },
  instantBookRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  instantBookContent: {
    flex: 1,
    marginRight: spacing.md,
  },
  instantBookTitle: {
    ...typography.body,
    marginBottom: spacing.xs,
  },
  instantBookDescription: {
    ...typography.bodySmall,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
  },
}); 