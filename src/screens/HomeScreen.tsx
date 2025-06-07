import React, { useState, useCallback } from 'react';
import { View, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useServices } from '../hooks/useServices';
import { useListings } from '../hooks/useListings';
import { ServiceCard } from '../components/ServiceCard';
import { ListingCard } from '../components/ListingCard';
import { SearchBar } from '../components/SearchBar';
import { CategoryTabs } from '../components/CategoryTabs';
import { Text } from '../components/Text';
import { useTheme } from '../theme/useTheme';
import { RootStackParamList } from '../navigation/types';
import { mockServices, mockExperiences, mockListings } from '../data/mockData';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Default images from Unsplash
const DEFAULT_IMAGES = {
  property: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
  service: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
};

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors } = useTheme();
  const [activeCategory, setActiveCategory] = useState('homes');
  const { services = mockServices, loading: servicesLoading, error: servicesError } = useServices();
  const { listings = mockListings, loading: listingsLoading, error: listingsError } = useListings();

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  const handleServicePress = (service: any) => {
    navigation.navigate('ServiceDetails', {
      service: {
        id: service.id,
        name: service.name,
        category: service.category,
        rating: service.rating,
        price: service.price,
        imageUrl: service.imageUrl || DEFAULT_IMAGES.service,
        description: service.description,
      },
    });
  };

  const handleListingPress = (listing: any) => {
    navigation.navigate('PropertyDetails', {
      propertyId: listing.id,
      title: listing.title,
      description: listing.description,
      price: listing.price,
      city: listing.city,
      bedrooms: listing.bedrooms,
      bathrooms: listing.bathrooms,
      area: listing.area,
      imageUrl: listing.imageUrl || DEFAULT_IMAGES.property,
    });
  };

  const renderContent = () => {
    switch (activeCategory) {
      case 'services':
        return (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Available Services</Text>
            <View style={styles.servicesGrid}>
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  name={service.name}
                  category={service.category}
                  rating={service.rating}
                  imageUrl={service.imageUrl || DEFAULT_IMAGES.service}
                  price={service.price}
                  onPress={() => handleServicePress(service)}
                />
              ))}
            </View>
          </View>
        );
      case 'experiences':
        return (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Featured Experiences</Text>
            <View style={styles.servicesGrid}>
              {mockExperiences.map((experience) => (
                <ServiceCard
                  key={experience.id}
                  name={experience.name}
                  category={experience.category}
                  rating={experience.rating}
                  imageUrl={experience.imageUrl || DEFAULT_IMAGES.service}
                  price={experience.price}
                  onPress={() => handleServicePress(experience)}
                />
              ))}
            </View>
          </View>
        );
      default:
        return (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Available Properties</Text>
            <View style={styles.listingsContainer}>
              {listings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  title={listing.title}
                  description={listing.description}
                  price={listing.price}
                  city={listing.city}
                  bedrooms={listing.bedrooms}
                  bathrooms={listing.bathrooms}
                  area={listing.area}
                  imageUrl={listing.imageUrl || DEFAULT_IMAGES.property}
                  onPress={() => handleListingPress(listing)}
                />
              ))}
            </View>
          </View>
        );
    }
  };

  if (servicesLoading || listingsLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (servicesError || listingsError) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.error }]}>
          {servicesError?.message || listingsError?.message || 'An error occurred'}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    textAlign: 'center',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  listingsContainer: {
    gap: 16,
  },
});
