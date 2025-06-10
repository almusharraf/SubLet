import React, { useState, useCallback } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Pressable,
} from 'react-native';
import { LucideHeart, LucideChevronLeft, LucideChevronRight } from 'lucide-react-native';
import { Text } from './Text';
import { getPropertyImage, CARD_WIDTH, IMAGE_HEIGHT } from '../utils/imageUtils';
import { useTheme } from '../theme/useTheme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { LucideBed, LucideBath, LucideMaximize, LucideCalendar } from 'lucide-react-native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface ListingCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  city: string;
  neighborhood: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  onPress: () => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  id,
  title,
  description,
  price,
  city,
  neighborhood,
  bedrooms,
  bathrooms,
  area,
  images,
  onPress,
}) => {
  const navigation = useNavigation<NavigationProp>();
  const { colors } = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadingImages, setLoadingImages] = useState<{ [key: string]: boolean }>({});

  // Generate dynamic images if none provided
  const generateDynamicImages = useCallback(() => {
    if (images.length > 0) return images;
    if (images[0]) return images;

    // Generate dynamic Unsplash URLs based on property details
    const keywords = [
      `${city},apartment`,
      `${title.split(' ')[0]},interior`,
      'modern,apartment,saudi'
    ];

    return keywords.map(keyword => 
      `https://source.unsplash.com/800x600/?${encodeURIComponent(keyword)}`
    );
  }, [images, city, title]);

  const allImages = generateDynamicImages();

  const handleImageLoad = (imageUrl: string) => {
    setLoadingImages(prev => ({
      ...prev,
      [imageUrl]: false
    }));
  };

  const handleImageLoadStart = (imageUrl: string) => {
    setLoadingImages(prev => ({
      ...prev,
      [imageUrl]: true
    }));
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => 
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  const formatBedrooms = (beds: number) => {
    if (beds === 0) return 'Studio';
    return `${beds} ${beds === 1 ? 'Bed' : 'Beds'}`;
  };

  const handleBookNow = () => {
    navigation.navigate('Booking', {
      propertyId: id,
      title,
      price,
      imageUrl: images[0],
      location: `${neighborhood}, ${city}`,
    });
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.surface }]}
      onPress={onPress}
    >
      <Image source={{ uri: images[0] }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
            {title}
          </Text>
          <Text style={[styles.price, { color: colors.primary }]}>
            ﷼{price.toLocaleString()}/month
          </Text>
        </View>

        <Text style={[styles.location, { color: colors.textSecondary }]}>
          {neighborhood}, {city}
        </Text>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <LucideBed size={16} color={colors.textSecondary} />
            <Text style={[styles.statText, { color: colors.textSecondary }]}>
              {bedrooms} {bedrooms === 1 ? 'Bed' : 'Beds'}
            </Text>
          </View>
          <View style={styles.stat}>
            <LucideBath size={16} color={colors.textSecondary} />
            <Text style={[styles.statText, { color: colors.textSecondary }]}>
              {bathrooms} {bathrooms === 1 ? 'Bath' : 'Baths'}
            </Text>
          </View>
          <View style={styles.stat}>
            <LucideMaximize size={16} color={colors.textSecondary} />
            <Text style={[styles.statText, { color: colors.textSecondary }]}>
              {area}m²
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.bookButton, { backgroundColor: colors.primary }]}
          onPress={handleBookNow}
        >
          <LucideCalendar size={18} color="#FFFFFF" />
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: spacing.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.subtitle,
    flex: 1,
    marginRight: spacing.sm,
  },
  price: {
    ...typography.subtitle,
    fontWeight: '600',
  },
  location: {
    ...typography.body,
    marginBottom: spacing.sm,
  },
  stats: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  statText: {
    ...typography.caption,
    marginLeft: spacing.xs,
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
    borderRadius: 8,
    gap: spacing.xs,
  },
  bookButtonText: {
    ...typography.button,
    color: '#FFFFFF',
  },
}); 