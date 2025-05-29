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
import { MapPin, Calendar, Sliders } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { properties } from '../data/properties';
import { PropertyCard } from '../components/PropertyCard';
import { SearchBar } from '../components/SearchBar';
import { FiltersModal, Filters } from '../components/FiltersModal';
import { DatesModal, DateRange } from '../components/DatesModal';
import { SearchMapModal } from '../components/SearchMapModal';
import { RootStackParamList } from '../navigation/AppNavigator';

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
    <View style={styles.header}>
      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Where are you going?"
        />
      </View>

      <View style={styles.filters}>
        <Pressable
          style={styles.filterButton}
          onPress={() => setIsDatesVisible(true)}
        >
          <Calendar size={20} color={colors.black} />
          <Text style={styles.filterText}>{formatDateRange()}</Text>
        </Pressable>

        <Pressable
          style={styles.filterButton}
          onPress={() => setIsFiltersVisible(true)}
        >
          <Sliders size={20} color={colors.black} />
          <Text style={styles.filterText}>Filters</Text>
        </Pressable>

        <Pressable
          style={styles.filterButton}
          onPress={() => setIsMapVisible(true)}
        >
          <MapPin size={20} color={colors.black} />
          <Text style={styles.filterText}>Map</Text>
        </Pressable>
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>No properties found</Text>
      <Text style={styles.emptyText}>
        Try adjusting your search or filters to find more options
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
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
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchContainer: {
    padding: spacing.md,
  },
  filters: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
  },
  filterText: {
    ...typography.bodySmall,
    marginLeft: spacing.xs,
  },
  content: {
    padding: spacing.md,
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
    color: colors.gray,
    textAlign: 'center',
  },
  testCard: {
    margin: spacing.md,
  },
});
