import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import {
  LucideChevronLeft,
  LucideHeart,
  LucideShare2,
  LucideStar,
  LucideMapPin,
  LucideMessageCircle,
  LucidePhone,
} from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { Button } from '../components/Button';
import { RootStackParamList } from '../navigation/AppNavigator';
import { properties } from '../data/properties';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'PropertyDetails'>;
type RoutePropType = RouteProp<RootStackParamList, 'PropertyDetails'>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const PropertyDetailsScreen: React.FC<{
  route: RouteProp<RootStackParamList, 'PropertyDetails'>;
  navigation: NavigationProp;
}> = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const property = properties.find(p => p.id === route.params.propertyId);

  if (!property) {
    return null;
  }

  const handleReserve = () => {
    navigation.navigate('Booking', {
      propertyId: property.id,
      dates: undefined,
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Image Gallery */}
        <View style={styles.gallery}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => {
              const newIndex = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
              setActiveImageIndex(newIndex);
            }}
          >
            {property.images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.image}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
          <View style={styles.galleryPagination}>
            {property.images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  {
                    backgroundColor: index === activeImageIndex
                      ? '#FFFFFF'
                      : 'rgba(255, 255, 255, 0.5)',
                  },
                ]}
              />
            ))}
          </View>
          <View style={[styles.header, { paddingTop: insets.top }]}>
            <TouchableOpacity
              style={[styles.headerButton, { backgroundColor: colors.surface }]}
              onPress={() => navigation.goBack()}
            >
              <LucideChevronLeft size={24} color={colors.text} />
            </TouchableOpacity>
            <View style={styles.headerRight}>
              <TouchableOpacity
                style={[styles.headerButton, { backgroundColor: colors.surface }]}
                onPress={() => {}}
              >
                <LucideShare2 size={24} color={colors.text} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.headerButton, { backgroundColor: colors.surface }]}
                onPress={() => {}}
              >
                <LucideHeart size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Content */}
        <View style={[styles.details, { backgroundColor: colors.background }]}>
          <Text style={[styles.title, { color: colors.text }]}>
            {property.title}
          </Text>
          <Text style={[styles.location, { color: colors.textSecondary }]}>
            {property.location}
          </Text>

          <View style={[styles.stats, { borderColor: colors.border }]}>
            <View style={styles.rating}>
              <LucideStar size={16} color={colors.star} />
              <Text style={[styles.ratingText, { color: colors.text }]}>
                {property.rating} · {property.reviews} reviews
              </Text>
            </View>
            <Text style={[styles.price, { color: colors.text }]}>
              ﷼{property.price} <Text style={{ color: colors.textSecondary }}>night</Text>
            </Text>
          </View>

          <Text style={[styles.description, { color: colors.text }]}>
            {property.description}
          </Text>

          {/* Map Preview */}
          <View style={styles.mapContainer}>
            <Text style={[styles.mapTitle, { color: colors.text }]}>
              Location
            </Text>
            <View style={[styles.mapWrapper, { backgroundColor: colors.surface }]}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: property.coordinates.latitude,
                  longitude: property.coordinates.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
                scrollEnabled={false}
                zoomEnabled={false}
                rotateEnabled={false}
                pitchEnabled={false}
                provider={Platform.OS === 'ios' ? PROVIDER_DEFAULT : PROVIDER_GOOGLE}
                userInterfaceStyle={isDark ? 'dark' : 'light'}
              >
                <Marker
                  coordinate={{
                    latitude: property.coordinates.latitude,
                    longitude: property.coordinates.longitude,
                  }}
                >
                  <View style={[styles.marker, { backgroundColor: colors.primary }]}>
                    <LucideMapPin size={16} color="#FFFFFF" />
                  </View>
                </Marker>
              </MapView>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={[styles.footer, {
        backgroundColor: colors.background,
        borderColor: colors.border,
        paddingBottom: insets.bottom || spacing.lg,
      }]}>
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.primary }]} 
            onPress={() => navigation.navigate('Inbox')}
          >
            <LucideMessageCircle size={24} color="#FFFFFF" />
            <Text style={[styles.actionButtonText, { color: '#FFFFFF' }]}>Message</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.surface }]} 
            onPress={() => {/* Handle call */}}
          >
            <LucidePhone size={24} color={colors.primary} />
            <Text style={[styles.actionButtonText, { color: colors.primary }]}>Call</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.primary, flex: 1.5 }]} 
            onPress={handleReserve}
          >
            <Text style={[styles.actionButtonText, { color: '#FFFFFF', fontSize: 16 }]}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  gallery: {
    height: SCREEN_WIDTH,
    backgroundColor: '#000000',
  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
  },
  galleryPagination: {
    position: 'absolute',
    bottom: spacing.lg,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.lg,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerRight: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  details: {
    padding: spacing.lg,
  },
  title: {
    ...typography.h2,
    marginBottom: spacing.xs,
  },
  location: {
    ...typography.body,
    marginBottom: spacing.lg,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: spacing.lg,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  ratingText: {
    ...typography.body,
  },
  price: {
    ...typography.h3,
  },
  description: {
    ...typography.body,
    marginBottom: spacing.xl,
  },
  mapContainer: {
    marginBottom: spacing.xl,
  },
  mapTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
  },
  mapWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  map: {
    height: 200,
  },
  marker: {
    padding: spacing.xs,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  actionButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  actionButtonText: {
    ...typography.button,
    fontSize: 14,
  },
});
