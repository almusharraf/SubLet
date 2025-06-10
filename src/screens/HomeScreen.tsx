import React, { useState, useCallback } from 'react';
import { View, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useServices, validateService } from '../hooks/useServices';
import { useListings } from '../hooks/useListings';
import { ServiceCard } from '../components/ServiceCard';
import { ListingCard } from '../components/ListingCard';
import { SearchBar } from '../components/SearchBar';
import { CategoryTabs } from '../components/CategoryTabs';
import { Text } from '../components/Text';
import { useTheme } from '../theme/useTheme';
import { RootStackParamList } from '../navigation/types';
import { mockServices, mockListings } from '../data/mockData';
import { getPropertyType, getPropertyImage, getServiceImage } from '../utils/imageUtils';
import type { Service, ServiceCategory } from '../types/service';
import type { Property } from '../types/property';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type Category = 'homes' | 'services';

// Default images from Unsplash
const DEFAULT_IMAGES = {
  property: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
  service: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
};

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors } = useTheme();
  const [activeCategory, setActiveCategory] = useState<Category>('homes');
  const { services = mockServices, loading: servicesLoading, error: servicesError } = useServices();
  const { listings = mockListings, loading: listingsLoading, error: listingsError } = useListings();

  const handleCategoryChange = useCallback((category: Category) => {
    setActiveCategory(category);
  }, []);

  const handleServicePress = (service: Service) => {
    navigation.navigate('ServiceDetails', { service });
  };

  const handleListingPress = (listing: Property) => {
    navigation.navigate('PropertyDetails', {
      id: listing.id,
    });
  };

  const renderLoadingState = () => (
    <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
        Loading {activeCategory}...
      </Text>
    </View>
  );

  const renderErrorState = (error: string | Error | null) => (
    <View style={[styles.errorContainer, { backgroundColor: colors.background }]}>
      <Text style={[styles.errorText, { color: colors.error }]}>
        {error instanceof Error ? error.message : error || 'An error occurred'}
      </Text>
      <Text style={[styles.errorSubtext, { color: colors.textSecondary }]}>
        Showing cached data
      </Text>
    </View>
  );

  const renderContent = () => {
    const isLoading = activeCategory === 'services' ? servicesLoading : listingsLoading;
    const error = activeCategory === 'services' ? servicesError : listingsError;

    if (isLoading) {
      return renderLoadingState();
    }

    if (error) {
      return renderErrorState(error);
    }

    switch (activeCategory) {
      case 'services':
        return (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Available Services
            </Text>
            <View style={styles.servicesContainer}>
              {(services ?? []).filter(validateService).map((service, idx) => {
                if (!service || typeof service !== 'object') {
                  console.warn(`[HomeScreen] Skipped invalid service at index ${idx}`, service);
                  return null;
                }

                return (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onPress={() => handleServicePress(service)}
                  />
                );
              })}
              {services?.length === 0 && (
                <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                  No services available
                </Text>
              )}
            </View>
          </View>
        );
      case 'homes':
      default:
        return (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Available Properties
            </Text>
            <View style={styles.listingsContainer}>
              {(listings as Property[]).map((listing) => (
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
                  onPress={() => handleListingPress(listing)}
                  style={styles.listingCard}
                >
                  {listing.has3DTour && (
                    <View style={[styles.badge, { backgroundColor: colors.primary }]}>
                      <Text style={[styles.badgeText, { color: colors.buttonText }]}>
                        3D Tour
                      </Text>
                    </View>
                  )}
                  <View style={[styles.badge, { backgroundColor: colors.card }]}>
                    <Text style={[styles.badgeText, { color: colors.text }]}>
                      {listing.daysListed} days on SubLet
                    </Text>
                  </View>
                </ListingCard>
              ))}
            </View>
          </View>
        );
    }
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      showsVerticalScrollIndicator={false}
    >
      <SearchBar />
      <CategoryTabs onCategoryChange={handleCategoryChange} />
      {renderContent()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  errorContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  errorSubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  listingsContainer: {
    gap: 16,
  },
  listingCard: {
    width: '100%',
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
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    padding: 20,
  },
});
