import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  ViewStyle,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { LucideHeart, LucideChevronLeft, LucideChevronRight } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { Property } from '../data/properties';

interface PropertyCardProps {
  property: Property;
  onPress?: (propertyId: string) => void;
  onSave?: () => void;
  style?: ViewStyle;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - spacing.screenPadding * 2;
const IMAGE_HEIGHT = 250;

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onPress,
  onSave,
  style,
}) => {
  const { colors } = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePress = () => {
    if (onPress) {
      onPress(property.id);
    }
  };

  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
        },
        style,
      ]}
      onPress={handlePress}
    >
      <View style={styles.imageContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          contentOffset={{ x: currentImageIndex * CARD_WIDTH, y: 0 }}
        >
          {property.images.map((image, index) => (
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

        {property.images.length > 1 && (
          <>
            <Pressable
              style={[styles.imageButton, styles.prevButton]}
              onPress={handlePrevImage}
              hitSlop={8}
            >
              <LucideChevronLeft size={24} color="#FFFFFF" />
            </Pressable>
            <Pressable
              style={[styles.imageButton, styles.nextButton]}
              onPress={handleNextImage}
              hitSlop={8}
            >
              <LucideChevronRight size={24} color="#FFFFFF" />
            </Pressable>
          </>
        )}

        <View style={styles.pagination}>
          {property.images.map((_, index) => (
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

        <Pressable
          style={styles.heartButton}
          onPress={onSave}
          hitSlop={8}
        >
          <LucideHeart
            size={24}
            color={property.isSaved ? colors.primary : '#FFFFFF'}
            fill={property.isSaved ? colors.primary : 'transparent'}
          />
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.location, { color: colors.text }]} numberOfLines={1}>
            {property.location}
          </Text>
          <View style={styles.rating}>
            <Text style={[styles.ratingText, { color: colors.text }]}>★ {property.rating}</Text>
          </View>
        </View>

        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
          {property.title}
        </Text>

        <View style={styles.details}>
          <Text style={[styles.type, { color: colors.textSecondary }]}>{property.type}</Text>
          <Text style={[styles.bullet, { color: colors.textSecondary }]}> • </Text>
          <Text style={[styles.beds, { color: colors.textSecondary }]}>
            {property.beds} {property.beds === 1 ? 'bed' : 'beds'}
          </Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={[styles.price, { color: colors.text }]}>
            ${property.price}
            <Text style={[styles.night, { color: colors.textSecondary }]}> / night</Text>
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    borderRadius: 12,
    marginBottom: spacing.lg,
  },
  imageContainer: {
    position: 'relative',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: spacing.xs,
  },
  prevButton: {
    left: spacing.md,
  },
  nextButton: {
    right: spacing.md,
  },
  pagination: {
    position: 'absolute',
    bottom: spacing.md,
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
    top: spacing.md,
    right: spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: spacing.xs,
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
  location: {
    ...typography.bodySmall,
    flex: 1,
    marginRight: spacing.sm,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    ...typography.bodySmall,
    fontWeight: '500',
  },
  title: {
    ...typography.h4,
    marginBottom: spacing.xs,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  type: {
    ...typography.bodySmall,
  },
  bullet: {
    ...typography.bodySmall,
  },
  beds: {
    ...typography.bodySmall,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    ...typography.h4,
  },
  night: {
    ...typography.body,
  },
});
