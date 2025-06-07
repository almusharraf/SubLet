import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LucideMapPin, LucideCalendar, LucideSliders } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { properties } from '../data/properties';
import { PropertyCard } from '../components/PropertyCard';
import { SearchBar } from '../components/SearchBar';
import { FiltersModal, Filters } from '../components/FiltersModal';
import { DatesModal, DateRange } from '../components/DatesModal';
import { SearchMapModal } from '../components/SearchMapModal';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SearchScreen = () => {
  console.log('Rendering SearchScreen');

  useEffect(() => {
    // Debug logging for imported components
    console.log('Imported components check:');
    console.log('PropertyCard:', typeof PropertyCard);
    console.log('SearchBar:', typeof SearchBar);
    console.log('FiltersModal:', typeof FiltersModal);
    console.log('DatesModal:', typeof DatesModal);
    console.log('SearchMapModal:', typeof SearchMapModal);
  }, []);

  const navigation = useNavigation<NavigationProp>();
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [isDatesVisible, setIsDatesVisible] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    priceRange: { min: 0, max: 1000 },
    bedrooms: 1,
    amenities: [],
  });
  const [dates, setDates] = useState<DateRange>({
    checkIn: null,
    checkOut: null,
  });

  // Test property for initial render
  const testProperty = properties[0];

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPrice = property.price >= filters.priceRange.min &&
      property.price <= filters.priceRange.max;

    const matchesBedrooms = property.bedrooms >= filters.bedrooms;

    const matchesAmenities = filters.amenities.length === 0 ||
      filters.amenities.every(amenity => property.amenities.includes(amenity));

    return matchesSearch && matchesPrice && matchesBedrooms && matchesAmenities;
  });

  const handlePropertyPress = (propertyId: string) => {
    navigation.navigate('PropertyDetails', { propertyId });
  };

  const handleFiltersApply = (newFilters: Filters) => {
    setFilters(newFilters);
    setIsFiltersVisible(false);
  };

  const handleDatesApply = (newDates: DateRange) => {
    setDates(newDates);
    setIsDatesVisible(false);
  };

  const formatDateRange = () => {
    if (!dates.checkIn || !dates.checkOut) return 'Add dates';
    return `${dates.checkIn.toLocaleDateString()} - ${dates.checkOut.toLocaleDateString()}`;
  };

  const renderHeader = () => (
    <View style={[styles.header, { 
      backgroundColor: colors.surface,
      borderBottomColor: colors.border,
    }]}>
      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Where are you going?"
        />
      </View>

      <View style={styles.filters}>
        <Pressable
          style={[styles.filterButton, { backgroundColor: colors.card }]}
          onPress={() => setIsDatesVisible(true)}
        >
          <LucideCalendar size={20} color={colors.text} />
          <Text style={[styles.filterText, { color: colors.text }]}>
            {formatDateRange()}
          </Text>
        </Pressable>

        <Pressable
          style={[styles.filterButton, { backgroundColor: colors.card }]}
          onPress={() => setIsFiltersVisible(true)}
        >
          <LucideSliders size={20} color={colors.text} />
          <Text style={[styles.filterText, { color: colors.text }]}>
            Filters
          </Text>
        </Pressable>

        <Pressable
          style={[styles.filterButton, { backgroundColor: colors.card }]}
          onPress={() => setIsMapVisible(true)}
        >
          <LucideMapPin size={20} color={colors.text} />
          <Text style={[styles.filterText, { color: colors.text }]}>
            Map
          </Text>
        </Pressable>
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyState}>
      <Text style={[styles.emptyTitle, { color: colors.text }]}>
        No properties found
      </Text>
      <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
        Try adjusting your search or filters to find more options
      </Text>
    </View>
  );

  return (
    <SafeAreaView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      edges={['top']}
    >
      {renderHeader()}

      {/* Test PropertyCard */}
      {testProperty && (
        <PropertyCard
          property={testProperty}
          onPress={() => handlePropertyPress(testProperty.id)}
          style={styles.testCard}
        />
      )}

      <FlatList
        data={filteredProperties}
        renderItem={({ item }) => (
          <PropertyCard
            property={item}
            onPress={() => handlePropertyPress(item.id)}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.content}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
      />

      <FiltersModal
        isVisible={isFiltersVisible}
        onClose={() => setIsFiltersVisible(false)}
        onApply={handleFiltersApply}
        initialFilters={filters}
      />

      <DatesModal
        isVisible={isDatesVisible}
        onClose={() => setIsDatesVisible(false)}
        onApply={handleDatesApply}
        initialDates={dates}
      />

      <SearchMapModal
        isVisible={isMapVisible}
        onClose={() => setIsMapVisible(false)}
        properties={filteredProperties}
        onPropertyPress={handlePropertyPress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomWidth: 1,
  },
  searchContainer: {
    padding: spacing.lg,
  },
  filters: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },
  filterButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    borderRadius: 8,
    gap: spacing.xs,
  },
  filterText: {
    ...typography.bodySmall,
    fontWeight: '500',
  },
  content: {
    padding: spacing.lg,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  emptyTitle: {
    ...typography.h2,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptyText: {
    ...typography.body,
    textAlign: 'center',
  },
  testCard: {
    margin: spacing.md,
  },
});
