import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Chip, Slider } from 'react-native-paper';
import MapView, { Circle } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../theme/useTheme';

interface SearchFiltersProps {
  onFiltersChange: (filters: SearchFilters) => void;
  initialFilters?: SearchFilters;
}

export interface SearchFilters {
  rentalType: 'short' | 'mid' | 'long';
  priceRange: { min: number; max: number };
  bedrooms: number;
  bathrooms: number;
  isFurnished: boolean;
  isPetFriendly: boolean;
  commuteRadius: number; // in minutes
  commuteLocation?: {
    latitude: number;
    longitude: number;
    name: string;
  };
  sortBy: 'distance' | 'price' | 'rating' | 'availability';
  amenities: string[];
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ 
  onFiltersChange,
  initialFilters = {
    rentalType: 'short',
    priceRange: { min: 0, max: 10000 },
    bedrooms: 1,
    bathrooms: 1,
    isFurnished: false,
    isPetFriendly: false,
    commuteRadius: 30,
    sortBy: 'distance',
    amenities: []
  }
}) => {
  const { colors } = useTheme();
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [showMap, setShowMap] = useState(false);

  const handleFilterChange = <K extends keyof SearchFilters>(
    key: K,
    value: SearchFilters[K]
  ) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const RentalTypeSelector = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Rental Type</Text>
      <View style={styles.chipGroup}>
        <Chip
          selected={filters.rentalType === 'short'}
          onPress={() => handleFilterChange('rentalType', 'short')}
          style={styles.chip}
        >
          Short-term
        </Chip>
        <Chip
          selected={filters.rentalType === 'mid'}
          onPress={() => handleFilterChange('rentalType', 'mid')}
          style={styles.chip}
        >
          Mid-term
        </Chip>
        <Chip
          selected={filters.rentalType === 'long'}
          onPress={() => handleFilterChange('rentalType', 'long')}
          style={styles.chip}
        >
          Long-term
        </Chip>
      </View>
    </View>
  );

  const PriceRangeSelector = () => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Price Range (SAR)</Text>
      <View style={styles.priceInputs}>
        <View style={styles.priceInput}>
          <Text style={[styles.priceLabel, { color: colors.textSecondary }]}>Min</Text>
          <Slider
            value={filters.priceRange.min}
            minimumValue={0}
            maximumValue={20000}
            step={500}
            onValueChange={(val) => handleFilterChange('priceRange', { ...filters.priceRange, min: val })}
          />
          <Text style={[styles.priceValue, { color: colors.text }]}>
            SAR {filters.priceRange.min.toLocaleString()}
          </Text>
        </View>
        <View style={styles.priceInput}>
          <Text style={[styles.priceLabel, { color: colors.textSecondary }]}>Max</Text>
          <Slider
            value={filters.priceRange.max}
            minimumValue={filters.priceRange.min}
            maximumValue={50000}
            step={500}
            onValueChange={(val) => handleFilterChange('priceRange', { ...filters.priceRange, max: val })}
          />
          <Text style={[styles.priceValue, { color: colors.text }]}>
            SAR {filters.priceRange.max.toLocaleString()}
          </Text>
        </View>
      </View>
    </View>
  );

  const RoomSelector = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Rooms</Text>
      <View style={styles.roomSelector}>
        <View style={styles.roomType}>
          <Text>Bedrooms</Text>
          <View style={styles.counterContainer}>
            <Button
              onPress={() => handleFilterChange('bedrooms', Math.max(1, filters.bedrooms - 1))}
            >-</Button>
            <Text style={styles.counterText}>{filters.bedrooms}</Text>
            <Button
              onPress={() => handleFilterChange('bedrooms', filters.bedrooms + 1)}
            >+</Button>
          </View>
        </View>
        <View style={styles.roomType}>
          <Text>Bathrooms</Text>
          <View style={styles.counterContainer}>
            <Button
              onPress={() => handleFilterChange('bathrooms', Math.max(1, filters.bathrooms - 1))}
            >-</Button>
            <Text style={styles.counterText}>{filters.bathrooms}</Text>
            <Button
              onPress={() => handleFilterChange('bathrooms', filters.bathrooms + 1)}
            >+</Button>
          </View>
        </View>
      </View>
    </View>
  );

  const AmenitiesSelector = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Amenities</Text>
      <View style={styles.chipGroup}>
        <Chip
          selected={filters.isFurnished}
          onPress={() => handleFilterChange('isFurnished', !filters.isFurnished)}
          style={styles.chip}
        >
          Furnished
        </Chip>
        <Chip
          selected={filters.isPetFriendly}
          onPress={() => handleFilterChange('isPetFriendly', !filters.isPetFriendly)}
          style={styles.chip}
        >
          Pet Friendly
        </Chip>
      </View>
    </View>
  );

  const CommuteSelector = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Commute Radius</Text>
      <Button
        mode="outlined"
        onPress={() => setShowMap(true)}
        icon={() => <MaterialCommunityIcons name="map-marker-radius" size={24} />}
      >
        Set Location & Radius
      </Button>
      {filters.commuteLocation && (
        <Text style={styles.commuteText}>
          {filters.commuteRadius} min from {filters.commuteLocation.name}
        </Text>
      )}
    </View>
  );

  const SortSelector = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Sort By</Text>
      <View style={styles.chipGroup}>
        {(['distance', 'price', 'rating', 'availability'] as const).map((sort) => (
          <Chip
            key={sort}
            selected={filters.sortBy === sort}
            onPress={() => handleFilterChange('sortBy', sort)}
            style={styles.chip}
          >
            {sort.charAt(0).toUpperCase() + sort.slice(1)}
          </Chip>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <RentalTypeSelector />
      <PriceRangeSelector />
      <RoomSelector />
      <AmenitiesSelector />
      <CommuteSelector />
      <SortSelector />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  chipGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  roomSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roomType: {
    flex: 1,
    marginRight: 16,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  counterText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  priceInputs: {
    gap: 16,
  },
  priceInput: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  priceValue: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  commuteText: {
    marginTop: 8,
    fontStyle: 'italic',
  },
});

export default SearchFilters; 