import React from 'react';
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

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Default images from Unsplash
const DEFAULT_IMAGES = {
  property: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
  service: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
};

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors } = useTheme();
  const { services, loading: servicesLoading, error: servicesError } = useServices();
  const { listings, loading: listingsLoading, error: listingsError } = useListings();

  const handleServicePress = (service: any) => {
    navigation.navigate('ServiceDetails', {
      service: {
        ...service,
        imageUrl: service.imageUrl || DEFAULT_IMAGES.service,
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
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <SearchBar />
      <CategoryTabs />
      
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Featured Services</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Latest Listings</Text>
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
});
