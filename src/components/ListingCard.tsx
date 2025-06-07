import React, { useState } from 'react';
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
import { getListingImages, CARD_WIDTH, IMAGE_HEIGHT } from '../utils/imageUtils';
import { useTheme } from '../theme/useTheme';

interface ListingCardProps {
  title: string;
  description: string;
  price: string | number;
  city: string;
  neighborhood: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageUrl?: string;
  images?: string[];
  isSaved?: boolean;
  onPress?: () => void;
  onSave?: () => void;
  style?: any;
  children?: React.ReactNode;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  title,
  description,
  price,
  city,
  neighborhood,
  bedrooms,
  bathrooms,
  area,
  imageUrl,
  images = [],
  isSaved = false,
  onPress,
  onSave,
  style,
  children,
}) => {
  const { colors } = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const allImages = images.length > 0 ? images : (imageUrl ? [imageUrl] : []);

  const handleImageLoad = () => {
    setIsLoading(false);
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

  return (
    <TouchableOpacity 
      style={[styles.container, style]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        {children}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          contentOffset={{ x: currentImageIndex * CARD_WIDTH, y: 0 }}
        >
          {allImages.map((image, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image
                source={{ uri: image }}
                style={styles.image}
                resizeMode="cover"
                onLoad={handleImageLoad}
              />
              {isLoading && (
                <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
                  <ActivityIndicator size="large" color={colors.primary} />
                </View>
              )}
            </View>
          ))}
        </ScrollView>

        {allImages.length > 1 && (
          <>
            <TouchableOpacity
              style={[styles.imageButton, styles.prevButton]}
              onPress={handlePrevImage}
              hitSlop={8}
            >
              <LucideChevronLeft size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.imageButton, styles.nextButton]}
              onPress={handleNextImage}
              hitSlop={8}
            >
              <LucideChevronRight size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </>
        )}

        <View style={styles.pagination}>
          {allImages.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                {
                  backgroundColor: index === currentImageIndex ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)',
                },
              ]}
            />
          ))}
        </View>

        {onSave && (
          <TouchableOpacity
            style={styles.heartButton}
            onPress={onSave}
            hitSlop={8}
          >
            <LucideHeart
              size={24}
              color={isSaved ? colors.primary : '#FFFFFF'}
              fill={isSaved ? colors.primary : 'transparent'}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.content}>
        <Text style={[styles.price, { color: colors.primary }]}>
          {typeof price === 'string' ? price : `${price.toLocaleString()} SAR`}/month
        </Text>

        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {title}
        </Text>

        <Text style={[styles.location, { color: colors.textSecondary }]}>
          {neighborhood}, {city}
        </Text>
        
        <View style={styles.details}>
          <Detail icon="🛏" value={formatBedrooms(bedrooms)} color={colors.textSecondary} />
          <Detail icon="🚿" value={`${bathrooms} ${bathrooms === 1 ? 'Bath' : 'Baths'}`} color={colors.textSecondary} />
          <Detail icon="📏" value={`${area}m²`} color={colors.textSecondary} />
        </View>

        <Text 
          style={[styles.description, { color: colors.textSecondary }]} 
          numberOfLines={2}
        >
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

interface DetailProps {
  icon: string;
  value: string;
  color: string;
}

const Detail: React.FC<DetailProps> = ({ icon, value, color }) => (
  <View style={styles.detailContainer}>
    <Text style={styles.detailIcon}>{icon}</Text>
    <Text style={[styles.detailValue, { color }]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: IMAGE_HEIGHT,
  },
  imageWrapper: {
    width: CARD_WIDTH,
    height: IMAGE_HEIGHT,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageButton: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -20 }],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prevButton: {
    left: 8,
  },
  nextButton: {
    right: 8,
  },
  pagination: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
    gap: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  location: {
    fontSize: 14,
  },
  details: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailIcon: {
    fontSize: 16,
  },
  detailValue: {
    fontSize: 14,
  },
}); 