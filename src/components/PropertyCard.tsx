import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  ViewStyle,
  Image,
} from 'react-native';
import { Heart } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { Property } from '../data/properties';

interface PropertyCardProps {
  property: Property;
  onPress?: () => void;
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
  return (
    <Pressable
      style={[styles.container, style]}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: property.images[0] }}
          style={styles.image}
          resizeMode="cover"
        />
        <Pressable
          style={styles.heartButton}
          onPress={onSave}
          hitSlop={8}
        >
          <Heart
            size={24}
            color={property.isSaved ? colors.primary : colors.white}
            fill={property.isSaved ? colors.primary : 'transparent'}
          />
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.location} numberOfLines={1}>
            {property.location}
          </Text>
          <View style={styles.rating}>
            <Text style={styles.ratingText}>★ {property.rating}</Text>
          </View>
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {property.title}
        </Text>

        <View style={styles.details}>
          <Text style={styles.type}>{property.type}</Text>
          <Text style={styles.bullet}> • </Text>
          <Text style={styles.beds}>
            {property.beds} {property.beds === 1 ? 'bed' : 'beds'}
          </Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            ${property.price}
            <Text style={styles.night}> / night</Text>
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: spacing.lg,
  },
  imageContainer: {
    position: 'relative',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: IMAGE_HEIGHT,
  },
  heartButton: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 50,
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
    ...typography.h3,
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
    color: colors.gray,
  },
  beds: {
    ...typography.bodySmall,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    ...typography.h3,
  },
  night: {
    ...typography.body,
    color: colors.gray,
  },
});
