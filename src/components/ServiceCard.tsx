import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Text } from './Text';
import { getServiceImage, CARD_WIDTH, IMAGE_HEIGHT } from '../utils/imageUtils';
import { useTheme } from '../theme/useTheme';

interface ServiceCardProps {
  name: string;
  category: string;
  rating: number;
  imageUrl?: string;
  price: number;
  onPress?: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  name,
  category,
  rating,
  imageUrl,
  price,
  onPress,
}) => {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const imageSource = { uri: getServiceImage(imageUrl, category) };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: colors.card }]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Image
          source={imageSource}
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

      <View style={styles.content}>
        <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
          {name}
        </Text>
        <Text style={[styles.category, { color: colors.textSecondary }]} numberOfLines={1}>
          {category}
        </Text>
        <View style={styles.footer}>
          <Text style={[styles.rating, { color: colors.primary }]}>★ {rating.toFixed(1)}</Text>
          <Text style={[styles.price, { color: colors.text }]}>${price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: (CARD_WIDTH - 16) / 2, // 2 columns with 16px gap
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: IMAGE_HEIGHT / 2, // Half height for service cards
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
  content: {
    padding: 12,
    gap: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  rating: {
    fontSize: 14,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
  },
}); 