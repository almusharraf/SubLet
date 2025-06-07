import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from './Text';

interface ListingCardProps {
  title: string;
  description: string;
  price: number;
  city: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageUrl: string;
  onPress?: () => void;
}

export function ListingCard({
  title,
  description,
  price,
  city,
  bedrooms,
  bathrooms,
  area,
  imageUrl,
  onPress,
}: ListingCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>${price}/month</Text>
        </View>
        
        <Text style={styles.location}>{city}</Text>
        <Text style={styles.description} numberOfLines={2}>{description}</Text>
        
        <View style={styles.details}>
          <Detail icon="🛏" value={`${bedrooms} beds`} />
          <Detail icon="🚿" value={`${bathrooms} baths`} />
          <Detail icon="📏" value={`${area}m²`} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

function Detail({ icon, value }: { icon: string; value: string }) {
  return (
    <View style={styles.detailContainer}>
      <Text style={styles.detailIcon}>{icon}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#444',
    marginBottom: 16,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 16,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  detailIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  detailValue: {
    fontSize: 14,
    color: '#666',
  },
}); 