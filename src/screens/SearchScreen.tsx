import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import { LucideSearch, LucideSliders, LucideBookmark } from 'lucide-react-native';
import { useTheme } from '../theme/useTheme';
import { SearchMapView } from '../components/SearchMapView';
import { ListingCard } from '../components/ListingCard';
import { SearchFilterChip } from '../components/SearchFilterChip';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Text } from '../components/Text';
import { useListings } from '../hooks/useListings';
import { Property } from '../types/property';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width - 32;
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

const formatPrice = (price: number) => {
  return `${price.toLocaleString()} SAR`;
};

export const SearchScreen: React.FC = () => {
  const { colors } = useTheme();
  const { listings, loading, error } = useListings();
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>();
  const [selectedPriceFilter, setSelectedPriceFilter] = useState(0);
  const [selectedBedroomFilter, setSelectedBedroomFilter] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollY = useRef(new Animated.Value(0)).current;

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

  const renderItem = ({ item: property }: { item: Property }) => (
    <ListingCard
      title={property.title}
      description={property.description}
      price={formatPrice(property.price)}
      city={property.city}
      neighborhood={property.neighborhood}
      bedrooms={property.bedrooms}
      bathrooms={property.bathrooms}
      area={property.area}
      images={property.images}
      style={[
        styles.card,
        selectedPropertyId === property.id && {
          borderColor: colors.primary,
          borderWidth: 2,
          transform: [{ scale: 1.02 }],
        },
      ]}
      onPress={() => setSelectedPropertyId(property.id)}
    >
      {property.has3DTour && (
        <View style={[styles.badge, { backgroundColor: colors.primary }]}>
          <Text style={[styles.badgeText, { color: colors.buttonText }]}>
            3D Tour
          </Text>
        </View>
      )}
      <View style={[styles.badge, { backgroundColor: colors.card }]}>
        <Text style={[styles.badgeText, { color: colors.text }]}>
          {property.daysListed} days on SubLet
        </Text>
      </View>
    </ListingCard>
  );

  if (loading) {
    return <LoadingSpinner message="Finding the perfect places for you..." />;
  }

  if (error) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.error }]}>
          {error}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <Animated.View
        style={[
          styles.header,
          { backgroundColor: colors.background },
        ]}
      >
        <View style={styles.searchContainer}>
          <View style={[styles.searchBar, { backgroundColor: colors.card }]}>
            <LucideSearch size={20} color={colors.text} />
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="Search by location..."
              placeholderTextColor={colors.textSecondary}
            />
          </View>
          <TouchableOpacity
            style={[styles.filterButton, { backgroundColor: colors.card }]}
          >
            <LucideSliders size={20} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.filtersContainer}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={PRICE_FILTERS}
            renderItem={({ item, index }) => (
              <SearchFilterChip
                label={item}
                isSelected={selectedPriceFilter === index}
                onPress={() => setSelectedPriceFilter(index)}
              />
            )}
            style={styles.filterList}
          />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={BEDROOM_FILTERS}
            renderItem={({ item, index }) => (
              <SearchFilterChip
                label={item}
                isSelected={selectedBedroomFilter === index}
                onPress={() => setSelectedBedroomFilter(index)}
              />
            )}
            style={styles.filterList}
          />
        </View>
      </Animated.View>

      {/* Map */}
      <View style={styles.mapContainer}>
        <SearchMapView
          properties={listings}
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

        <Animated.FlatList
          ref={flatListRef}
          data={listings}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          snapToInterval={CARD_WIDTH + 16}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingTop: Platform.OS === 'ios' ? 44 : 0,
    paddingHorizontal: 16,
    paddingBottom: 8,
    height: HEADER_HEIGHT,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
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
  filtersContainer: {
    gap: 8,
  },
  filterList: {
    paddingVertical: 4,
  },
  mapContainer: {
    marginTop: HEADER_HEIGHT,
    height: MAP_HEIGHT,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  bottomSheet: {
    height: BOTTOM_SHEET_HEIGHT,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  resultsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  resultsText: {
    fontSize: 16,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 16,
  },
  card: {
    width: CARD_WIDTH,
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 1,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  saveSearchButton: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    height: 48,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  saveSearchText: {
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
  },
});
