import 'react-native-reanimated';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Animated,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { LucideSearch, LucideSliders, LucideBookmark, LucideX, LucideMap, LucideList } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { SearchStackParamList, RootStackParamList } from '../navigation/types';
import { useTheme } from '../theme/useTheme';
import { SearchMapView } from '../components/SearchMapView';
import { ListingCard } from '../components/ListingCard';
import { SearchFilterChip } from '../components/SearchFilterChip';
import { Text } from '../components/Text';
import { useListings } from '../hooks/useListings';
import { Property } from '../types/property';
import MapView from 'react-native-maps';
import BottomSheet from '@gorhom/bottom-sheet';
import { FAB } from 'react-native-paper';
import { FiltersModal } from '../components/FiltersModal';
import MapRadiusSelector from '../components/MapRadiusSelector';
import { getListings } from '../api/firebase';
import { calculateDistance } from '../utils/distance';
import Modal from 'react-native-modal';
import SearchFilters from '../components/SearchFilters';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width - 48; // Slightly smaller cards with padding
const MAP_HEIGHT = height * 0.45; // Slightly smaller map
const HEADER_HEIGHT = Platform.OS === 'ios' ? 140 : 100;
const BOTTOM_SHEET_HEIGHT = height - MAP_HEIGHT - HEADER_HEIGHT;

const PRICE_FILTERS = [
  'Any Price',
  'Up to 5K SAR',
  '5K-10K SAR',
  '10K-15K SAR',
  '15K+ SAR',
];

const BEDROOM_FILTERS = [
  'Any Beds',
  'Studio',
  '1 Bed',
  '2 Beds',
  '3+ Beds',
];

type SearchScreenNavigationProp = NativeStackNavigationProp<SearchStackParamList>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const formatPrice = (price: number) => {
  return `${price.toLocaleString()} SAR`;
};

export const SearchScreen: React.FC = () => {
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const { colors } = useTheme();
  const { listings = [], loading, error } = useListings();
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>();
  const [selectedPriceFilter, setSelectedPriceFilter] = useState(0);
  const [selectedBedroomFilter, setSelectedBedroomFilter] = useState(0);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [showFilters, setShowFilters] = useState(false);
  const [isMapView, setIsMapView] = useState(true);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState({
    priceRange: {
      min: 0,
      max: 10000
    },
    bedrooms: 1,
    amenities: []
  });

  // Bottom sheet setup with proper types
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%', '85%'], []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (listings.length > 0) {
        setIsFilterModalVisible(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [listings]);

  const handlePropertyPress = (property: Property) => {
    navigation.navigate('PropertyDetail', { property });
  };

  const handleMarkerPress = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
    const index = listings.findIndex(p => p.id === propertyId);
    if (index !== -1 && flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5,
      });
    }
  };

  const renderItem = ({ item }: { item: Property }) => (
    <View style={styles.cardContainer}>
      <ListingCard
        title={item.title}
        description={item.description}
        price={item.price}
        city={item.city}
        neighborhood={item.neighborhood}
        bedrooms={item.bedrooms}
        bathrooms={item.bathrooms}
        area={item.area}
        images={item.images}
        onPress={() => handlePropertyPress(item)}
      />
    </View>
  );

  const renderLoadingState = () => (
    <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
        Finding properties...
      </Text>
    </View>
  );

  const renderErrorState = (error: string | Error | null) => (
    <View style={[styles.errorContainer, { backgroundColor: colors.background }]}>
      <Text style={[styles.errorText, { color: colors.error }]}>
        {error instanceof Error ? error.message : error || 'An error occurred'}
      </Text>
    </View>
  );

  const renderContent = () => (
    <>
      {/* Map View */}
      <View style={styles.mapContainer}>
        <SearchMapView
          properties={listings as Property[]}
          selectedPropertyId={selectedPropertyId}
          onMarkerPress={handleMarkerPress}
          style={styles.map}
        />
      </View>

      {/* Bottom Sheet */}
      <View style={[styles.bottomSheet, { backgroundColor: colors.background }]}>
        <View style={styles.resultsHeader}>
          <Text style={[styles.resultsText, { color: colors.text }]}>
            {listings.length} rentals available
          </Text>
        </View>

        <FlatList
          data={listings as Property[]}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          snapToInterval={CARD_WIDTH + 16}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
        />

        <TouchableOpacity
          style={[styles.saveSearchButton, { backgroundColor: colors.primary }]}
        >
          <LucideBookmark size={20} color={colors.buttonText} />
          <Text style={[styles.saveSearchText, { color: colors.buttonText }]}>
            Save Search
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );

  const loadProperties = async () => {
    try {
      setLoading(true);
      const listings = await getListings();
      setFilteredProperties(listings as Property[]);
      applyFilters(listings as Property[], filters);
    } catch (error) {
      console.error('Error loading properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
    setIsFilterModalVisible(false);
    
    // Apply filters immediately
    const filtered = applyFilters(listings, newFilters);
    setFilteredProperties(filtered);
  };

  const applyFilters = (propertiesToFilter: Property[], currentFilters: any): Property[] => {
    // If no filters are set, return all properties
    if (!currentFilters) return propertiesToFilter;

    let filtered = propertiesToFilter.filter(property => {
      // Price range filter
      if (currentFilters.priceRange) {
        const { min, max } = currentFilters.priceRange;
        if (property.price < min || property.price > max) return false;
      }

      // Bedroom filter
      if (currentFilters.bedrooms && property.bedrooms < currentFilters.bedrooms) return false;

      // Amenities filter
      if (currentFilters.amenities && currentFilters.amenities.length > 0) {
        const requiredAmenities = currentFilters.amenities;
        const hasAllAmenities = requiredAmenities.every((amenity: string) => 
          property.amenities?.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    });

    // Optional: Add sorting logic here if needed
    return filtered;
  };

  // Initialize filtered properties when listings change
  useEffect(() => {
    if (listings && listings.length > 0) {
      const filtered = applyFilters(listings, filters);
      setFilteredProperties(filtered);
    }
  }, [listings]);

  const handleMapSelect = (location: { latitude: number; longitude: number; name: string }, radius: number) => {
    const newFilters = {
      ...filters,
      commuteLocation: location,
      commuteRadius: radius
    };
    setFilters(newFilters);
    applyFilters(listings, newFilters);
    setIsMapView(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Search Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <View style={styles.searchRow}>
          <View style={[styles.searchBar, { backgroundColor: colors.surface }]}>
            <LucideSearch size={20} color={colors.textSecondary} />
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="Search locations"
              placeholderTextColor={colors.textSecondary}
            />
          </View>
          <TouchableOpacity
            style={[styles.filterButton, { backgroundColor: colors.surface }]}
            onPress={() => setShowFilters(true)}
          >
            <LucideSliders size={20} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, { backgroundColor: colors.surface }]}
            onPress={() => setIsMapView(!isMapView)}
          >
            {isMapView ? (
              <LucideList size={20} color={colors.text} />
            ) : (
              <LucideMap size={20} color={colors.text} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      {loading ? (
        renderLoadingState()
      ) : error ? (
        renderErrorState(error)
      ) : (
        <View style={styles.content}>
          <Text style={[styles.listingCount, { color: colors.text }]}>
            {filteredProperties.length} rentals available
          </Text>

          {isMapView ? (
            <View style={styles.mapContainer}>
              <SearchMapView
                properties={filteredProperties}
                selectedPropertyId={selectedPropertyId}
                onMarkerPress={handleMarkerPress}
                style={styles.map}
              />
            </View>
          ) : (
            <FlatList
              data={filteredProperties}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listingsContainer}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      )}

      <FiltersModal
        isVisible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        onApply={handleFiltersChange}
        initialFilters={filters}
      />

      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        backgroundStyle={[styles.bottomSheetBackground, { backgroundColor: colors.card }]}
        handleIndicatorStyle={[styles.handleIndicator, { backgroundColor: colors.border }]}
      >
        <View style={styles.bottomSheetContent}>
          <Text style={[styles.listingCount, { color: colors.text }]}>
            {listings.length} rentals available
          </Text>

          {loading ? (
            <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
              Loading listings...
            </Text>
          ) : (
            <FlatList
              data={filteredProperties}
              renderItem={({ item: listing }) => (
                <ListingCard
                  key={listing.id}
                  title={listing.title}
                  description={listing.description}
                  price={listing.price}
                  city={listing.city}
                  neighborhood={listing.neighborhood}
                  bedrooms={listing.bedrooms}
                  bathrooms={listing.bathrooms}
                  area={listing.area}
                  images={listing.images}
                  onPress={() => navigation.navigate('PropertyDetail', { property: listing })}
                  style={styles.listingCard}
                />
              )}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.listingsContainer}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </BottomSheet>

      <Modal
        isVisible={showFilters}
        onBackdropPress={() => setShowFilters(false)}
        onSwipeComplete={() => setShowFilters(false)}
        swipeDirection={['down']}
        style={styles.modal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        useNativeDriver
        hideModalContentWhileAnimating
      >
        <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
          <SearchFilters
            onFiltersChange={handleFiltersChange}
          />
        </View>
      </Modal>

      <Modal
        isVisible={!isMapView}
        onBackdropPress={() => setIsMapView(true)}
        onSwipeComplete={() => setIsMapView(true)}
        swipeDirection={['down']}
        style={styles.modal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        useNativeDriver
        hideModalContentWhileAnimating
      >
        <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
          <MapRadiusSelector
            onSelect={handleMapSelect}
            onClose={() => setIsMapView(true)}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  searchRow: {
    flexDirection: 'row',
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 44,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  listingsContainer: {
    gap: 16,
    paddingBottom: 80, // Space for FAB
  },
  cardContainer: {
    marginBottom: 16,
  },
  listingCount: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    maxHeight: '90%',
  },
  mapContainer: {
    height: MAP_HEIGHT,
  },
  map: {
    flex: 1,
  },
  bottomSheet: {
    height: BOTTOM_SHEET_HEIGHT,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  resultsHeader: {
    marginBottom: 16,
  },
  resultsText: {
    fontSize: 16,
    fontWeight: '600',
  },
  saveSearchButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    borderRadius: 24,
    marginTop: 16,
    gap: 8,
  },
  saveSearchText: {
    fontSize: 16,
    fontWeight: '600',
  },
  bottomSheetBackground: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  handleIndicator: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  bottomSheetContent: {
    flex: 1,
    padding: 16,
  },
  listingCard: {
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  listContent: {
    paddingRight: 16,
  },
});
