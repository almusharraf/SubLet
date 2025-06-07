import React from 'react';
import { View, ScrollView, Image, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { Text } from '../components/Text';
import { useTheme } from '../theme/useTheme';

type ServiceDetailsRouteProp = RouteProp<RootStackParamList, 'ServiceDetails'>;

export const ServiceDetailsScreen: React.FC = () => {
  const route = useRoute<ServiceDetailsRouteProp>();
  const { colors } = useTheme();
  const { service } = route.params;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Image source={{ uri: service.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={[styles.name, { color: colors.text }]}>{service.name}</Text>
        <Text style={[styles.category, { color: colors.textSecondary }]}>
          {service.category}
        </Text>
        <View style={styles.ratingPrice}>
          <Text style={[styles.rating, { color: colors.text }]}>
            ★ {service.rating.toFixed(1)}
          </Text>
          <Text style={[styles.price, { color: colors.primary }]}>
            ${service.price}
          </Text>
        </View>
        <Text style={[styles.description, { color: colors.text }]}>
          {service.description || 'No description available'}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  category: {
    fontSize: 16,
    marginBottom: 16,
  },
  ratingPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  rating: {
    fontSize: 18,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
}); 