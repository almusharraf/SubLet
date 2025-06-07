import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LucideHeart, LucideStar } from 'lucide-react-native';
import { useTheme } from '../theme/useTheme';
import { spacing, typography, borderRadius } from '../theme/theme';
import { RootStackParamList } from '../navigation/types';
import { properties } from '../data/properties';
import { SafeAreaView } from 'react-native-safe-area-context';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_MARGIN = spacing.md;
const CARD_WIDTH = SCREEN_WIDTH - CARD_MARGIN * 2;
const CARD_HEIGHT = CARD_WIDTH * 0.75;

interface Wishlist {
  id: string;
  name: string;
  properties: string[];
  coverImage: string;
}

const mockWishlists: Wishlist[] = [
  {
    id: '1',
    name: 'Beach Getaways',
    properties: ['1'],
    coverImage: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf',
  },
  {
    id: '2',
    name: 'City Breaks',
    properties: ['2'],
    coverImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
  },
  {
    id: '3',
    name: 'Mountain Retreats',
    properties: ['3'],
    coverImage: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8',
  },
];

export const WishlistScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const handleWishlistPress = (wishlistId: string) => {
    // TODO: Navigate to wishlist detail
  };

  const handlePropertyPress = (propertyId: string) => {
    navigation.navigate('PropertyDetails', { propertyId });
  };

  const renderHeader = () => (
    <View style={[styles.header, { 
      backgroundColor: colors?.background ?? '#FFFFFF',
      borderColor: colors?.border ?? '#E5E5E5',
    }]}>
      <Text style={[styles.headerTitle, { color: colors?.text ?? '#000000' }]}>
        Wishlists
      </Text>
    </View>
  );

  const renderEmptyState = () => (
    <View style={[styles.emptyState, { backgroundColor: colors?.background ?? '#FFFFFF' }]}>
      <Text style={[styles.wishlistName, { color: colors?.text ?? '#000000' }]}>
        Create your first wishlist
      </Text>
      <Text style={[styles.emptyText, { color: colors?.textSecondary ?? '#666666' }]}>
        As you search, tap the heart icon to save your favorite places and experiences to a wishlist
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors?.background ?? '#FFFFFF' }]}>
      {renderHeader()}
      <ScrollView contentContainerStyle={styles.content}>
        {renderEmptyState()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  headerTitle: {
    ...typography.h2,
  },
  content: {
    flexGrow: 1,
    padding: spacing.lg,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  wishlistName: {
    ...typography.h3,
    marginBottom: spacing.sm,
  },
  emptyText: {
    ...typography.body,
    textAlign: 'center',
  },
  wishlistCard: {
    margin: CARD_MARGIN,
    borderRadius: 12,
    overflow: 'hidden',
  },
  wishlistImage: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  wishlistOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  wishlistCount: {
    ...typography.bodySmall,
  },
  section: {
    padding: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
  },
  propertyCard: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
  },
  propertyImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  propertyContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  propertyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  propertyTitle: {
    ...typography.body,
    flex: 1,
    marginRight: spacing.sm,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    ...typography.bodySmall,
    marginLeft: spacing.xs,
  },
  propertyLocation: {
    ...typography.bodySmall,
    marginBottom: spacing.xs,
  },
  propertyPrice: {
    ...typography.body,
  },
}); 