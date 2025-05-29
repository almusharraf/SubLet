import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Pressable,
  Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Heart,
  Share2,
  Star,
  Users,
  Bed,
  Bath,
  Home,
  ChevronLeft,
  MapPin,
} from 'lucide-react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { properties } from '../data/properties';
import { Button } from '../components/Button';
import { MapModal } from '../components/MapModal';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RoutePropType = RouteProp<RootStackParamList, 'PropertyDetails'>;

const { width } = Dimensions.get('window');
const IMAGE_HEIGHT = 300;

export const PropertyDetailsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  const { propertyId } = route.params;
  const [isMapVisible, setIsMapVisible] = useState(false);

  const property = properties.find(p => p.id === propertyId);

  if (!property) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Property not found</Text>
      </View>
    );
  }

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Save property:', propertyId);
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    console.log('Share property:', propertyId);
  };

  const handleBook = () => {
    // TODO: Implement booking functionality
    console.log('Book property:', propertyId);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: property.images[0] }}
            style={styles.image}
            resizeMode="cover"
          />
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ChevronLeft size={24} color={colors.black} />
          </Pressable>
          <View style={styles.imageActions}>
            <Pressable style={styles.actionButton} onPress={handleShare}>
              <Share2 size={24} color={colors.black} />
            </Pressable>
            <Pressable style={styles.actionButton} onPress={handleSave}>
              <Heart
                size={24}
                color={property.isSaved ? colors.primary : colors.black}
                fill={property.isSaved ? colors.primary : 'transparent'}
              />
            </Pressable>
          </View>
        </View>

        <View style={styles.details}>
          <Text style={styles.title}>{property.title}</Text>
          <View style={styles.ratingContainer}>
            <Star size={16} color={colors.black} fill={colors.black} />
            <Text style={styles.rating}>
              {property.rating} · {property.reviews} reviews
            </Text>
          </View>
          <Text style={styles.location}>{property.location}</Text>

          <Pressable
            style={styles.mapButton}
            onPress={() => setIsMapVisible(true)}
          >
            <MapPin size={20} color={colors.primary} />
            <Text style={styles.mapButtonText}>View on map</Text>
          </Pressable>

          <View style={styles.divider} />

          <View style={styles.features}>
            <View style={styles.feature}>
              <Home size={24} color={colors.black} />
              <Text style={styles.featureText}>{property.type}</Text>
            </View>
            <View style={styles.feature}>
              <Users size={24} color={colors.black} />
              <Text style={styles.featureText}>
                {property.maxGuests} guests
              </Text>
            </View>
            <View style={styles.feature}>
              <Bed size={24} color={colors.black} />
              <Text style={styles.featureText}>
                {property.beds} {property.beds === 1 ? 'bed' : 'beds'}
              </Text>
            </View>
            <View style={styles.feature}>
              <Bath size={24} color={colors.black} />
              <Text style={styles.featureText}>
                {property.bathrooms} {property.bathrooms === 1 ? 'bath' : 'baths'}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>About this place</Text>
          <Text style={styles.description}>{property.description}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.amenities}>
            {property.amenities.map((amenity, index) => (
              <Text key={index} style={styles.amenity}>
                • {amenity}
              </Text>
            ))}
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Host</Text>
          <View style={styles.hostContainer}>
            <Image
              source={{ uri: property.host.avatar }}
              style={styles.hostAvatar}
              resizeMode="cover"
            />
            <View style={styles.hostInfo}>
              <Text style={styles.hostName}>{property.host.name}</Text>
              <Text style={styles.hostJoined}>Host since 2023</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${property.price}</Text>
          <Text style={styles.night}> / night</Text>
        </View>
        <Button onPress={handleBook}>Check availability</Button>
      </SafeAreaView>

      <MapModal
        isVisible={isMapVisible}
        onClose={() => setIsMapVisible(false)}
        title={property.title}
        location={property.location}
        coordinates={property.coordinates}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    width,
    height: IMAGE_HEIGHT,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: spacing.xl,
    left: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: 50,
    padding: spacing.xs,
  },
  imageActions: {
    position: 'absolute',
    top: spacing.xl,
    right: spacing.lg,
    flexDirection: 'row',
  },
  actionButton: {
    backgroundColor: colors.white,
    borderRadius: 50,
    padding: spacing.xs,
    marginLeft: spacing.sm,
  },
  details: {
    padding: spacing.lg,
  },
  title: {
    ...typography.h2,
    marginBottom: spacing.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  rating: {
    ...typography.body,
    marginLeft: spacing.xs,
  },
  location: {
    ...typography.body,
    color: colors.gray,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.sm,
  },
  feature: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.md,
  },
  featureText: {
    ...typography.body,
    marginLeft: spacing.sm,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
  },
  description: {
    ...typography.body,
    color: colors.gray,
    lineHeight: 24,
  },
  amenities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenity: {
    ...typography.body,
    width: '50%',
    marginBottom: spacing.sm,
  },
  hostContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hostAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: spacing.md,
  },
  hostInfo: {
    flex: 1,
  },
  hostName: {
    ...typography.body,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  hostJoined: {
    ...typography.bodySmall,
    color: colors.gray,
  },
  footer: {
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    ...typography.h2,
  },
  night: {
    ...typography.body,
    color: colors.gray,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  errorText: {
    ...typography.h2,
    color: colors.error,
    textAlign: 'center',
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    marginTop: spacing.sm,
  },
  mapButtonText: {
    ...typography.body,
    color: colors.primary,
    marginLeft: spacing.xs,
    textDecorationLine: 'underline',
  },
});
