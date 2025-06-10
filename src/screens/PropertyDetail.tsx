import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  Linking,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import {
  LucideArrowLeft,
  LucideHeart,
  LucideShare2,
  LucideBed,
  LucideBath,
  LucideSquare,
  LucidePhone,
  LucideMessageCircle,
} from 'lucide-react-native';
import { Text } from '../components/Text';
import { useTheme } from '../theme/useTheme';
import { Property } from '../types/property';
import { ImageCarousel } from '../components/ImageCarousel';

const { width } = Dimensions.get('window');

export const PropertyDetail: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { property } = route.params as { property: Property };
  const [isSaved, setIsSaved] = useState(false);

  const handleCall = () => {
    Linking.openURL('tel:+966500000000');
  };

  const handleMessage = () => {
    // Implement chat functionality
    console.log('Open chat with owner');
  };

  const handleShare = () => {
    // Implement share functionality
    console.log('Share property');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <LucideArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setIsSaved(!isSaved)}
          >
            <LucideHeart
              size={24}
              color={isSaved ? colors.primary : colors.text}
              fill={isSaved ? colors.primary : 'transparent'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={handleShare}>
            <LucideShare2 size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Images */}
        <ImageCarousel images={property.images} />

        {/* Content */}
        <View style={styles.content}>
          {/* Title & Price */}
          <View style={styles.titleContainer}>
            <Text style={[styles.price, { color: colors.primary }]}>
              {property.price.toLocaleString()} SAR/month
            </Text>
            <Text style={[styles.title, { color: colors.text }]}>
              {property.title}
            </Text>
            <Text style={[styles.location, { color: colors.textSecondary }]}>
              {property.neighborhood}, {property.city}
            </Text>
          </View>

          {/* Property Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.detail}>
              <LucideBed size={24} color={colors.text} />
              <Text style={[styles.detailText, { color: colors.text }]}>
                {property.bedrooms === 0 ? 'Studio' : `${property.bedrooms} Beds`}
              </Text>
            </View>
            <View style={styles.detail}>
              <LucideBath size={24} color={colors.text} />
              <Text style={[styles.detailText, { color: colors.text }]}>
                {property.bathrooms} Baths
              </Text>
            </View>
            <View style={styles.detail}>
              <LucideSquare size={24} color={colors.text} />
              <Text style={[styles.detailText, { color: colors.text }]}>
                {property.area}m²
              </Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Description
            </Text>
            <Text style={[styles.description, { color: colors.textSecondary }]}>
              {property.description}
            </Text>
          </View>

          {/* Additional Info */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Property Details
            </Text>
            <Text style={[styles.listingInfo, { color: colors.textSecondary }]}>
              Listed {property.daysListed} days ago
            </Text>
            {property.has3DTour && (
              <Text style={[styles.tourInfo, { color: colors.primary }]}>
                3D Virtual Tour Available
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={[styles.bottomActions, { backgroundColor: colors.background }]}>
        <TouchableOpacity
          style={[styles.messageButton, { backgroundColor: colors.primary }]}
          onPress={handleMessage}
        >
          <LucideMessageCircle size={24} color={colors.buttonText} />
          <Text style={[styles.buttonText, { color: colors.buttonText }]}>
            Message
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.callButton, { backgroundColor: colors.card }]}
          onPress={handleCall}
        >
          <LucidePhone size={24} color={colors.primary} />
          <Text style={[styles.buttonText, { color: colors.primary }]}>Call</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 44 : 16,
    paddingBottom: 8,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 16,
  },
  headerButton: {
    padding: 8,
  },
  content: {
    padding: 16,
  },
  titleContainer: {
    marginBottom: 24,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  detail: {
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  listingInfo: {
    fontSize: 14,
    marginBottom: 4,
  },
  tourInfo: {
    fontSize: 14,
    fontWeight: '500',
  },
  bottomActions: {
    flexDirection: 'row',
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    gap: 12,
  },
  messageButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 24,
    gap: 8,
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 24,
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 