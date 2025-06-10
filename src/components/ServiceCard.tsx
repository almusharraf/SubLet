import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  Platform,
  ImageBackground,
} from 'react-native';
import { LucideStar } from 'lucide-react-native';
import { useTheme } from '../theme/useTheme';
import { Service } from '../types/service';
import { Text } from './Text';

// Default fallback image from Unsplash
const DEFAULT_IMAGE = 'https://source.unsplash.com/800x600/?service';

interface ServiceCardProps {
  service: Service;
  onPress: (service: Service) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onPress }) => {
  const { colors } = useTheme();

  // Strict validation check
  if (!service || !service.name || !service.provider) {
    console.warn('[ServiceCard] Service is undefined or incomplete:', 
      JSON.stringify(service, null, 2)
    );
    return null;
  }

  // Explicit props destructuring with defaults
  const {
    id,
    name,
    category,
    rating = 0,
    price = 0,
    currency = 'SAR',
    reviews = 0,
    imageUrl,
    provider
  } = service;

  // Handle missing image URL with fallback
  const getImageSource = () => {
    if (!imageUrl) {
      console.warn(`[ServiceCard] Using fallback image for service: ${name}`);
      return { uri: DEFAULT_IMAGE };
    }
    try {
      new URL(imageUrl);
      return { uri: imageUrl };
    } catch (e) {
      console.warn(`[ServiceCard] Invalid image URL for service: ${name}`);
      return { uri: DEFAULT_IMAGE };
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: colors.card },
        pressed && Platform.OS === 'ios' && { opacity: 0.9 },
      ]}
      onPress={() => onPress(service)}
      android_ripple={{ color: colors.border }}
    >
      <ImageBackground
        source={getImageSource()}
        style={styles.image}
        imageStyle={styles.imageStyle}
        onError={() => {
          console.warn(`[ServiceCard] Failed to load image for service: ${name}`);
        }}
      >
        <View style={styles.overlay}>
          <View style={styles.categoryTag}>
            <Text style={styles.categoryText}>
              {category}
            </Text>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text 
            style={[styles.title, { color: colors.text }]}
            numberOfLines={1}
          >
            {name}
          </Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.rating}>
            <LucideStar size={16} color={colors.primary} fill={colors.primary} />
            <Text style={[styles.ratingText, { color: colors.text }]}>
              {rating.toFixed(1)}
            </Text>
            <Text style={[styles.reviewCount, { color: colors.textSecondary }]}>
              ({reviews})
            </Text>
          </View>

          <Text style={[styles.price, { color: colors.primary }]}>
            {price} {currency}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    height: 160,
    width: '100%',
  },
  imageStyle: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  overlay: {
    flex: 1,
    padding: 12,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  categoryTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: 12,
  },
  header: {
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
  },
  reviewCount: {
    fontSize: 12,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 