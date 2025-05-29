import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

type TripsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Trips'>;

interface Trip {
  id: string;
  propertyTitle: string;
  propertyImage: string;
  location: string;
  hostName: string;
  hostImage: string;
  checkIn: string;
  checkOut: string;
  status: 'upcoming' | 'past' | 'cancelled';
  totalPrice: number;
}

const trips: Trip[] = [
  {
    id: '1',
    propertyTitle: 'Luxury Apartment in Kingdom Tower',
    propertyImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
    location: 'Riyadh, Saudi Arabia',
    hostName: 'Mohammed Al-Saud',
    hostImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    checkIn: '2024-04-15',
    checkOut: '2024-04-20',
    status: 'upcoming',
    totalPrice: 3995,
  },
  {
    id: '2',
    propertyTitle: 'Modern Villa in AlUla Old Town',
    propertyImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
    location: 'AlUla, Saudi Arabia',
    hostName: 'Sara Al-Rashid',
    hostImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    checkIn: '2024-03-01',
    checkOut: '2024-03-05',
    status: 'past',
    totalPrice: 5196,
  },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const TripsScreen = () => {
  const navigation = useNavigation<TripsScreenNavigationProp>();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const filteredTrips = trips.filter(trip => 
    activeTab === 'upcoming' 
      ? trip.status === 'upcoming'
      : trip.status === 'past'
  );

  const renderTripCard = (trip: Trip) => (
    <Pressable 
      key={trip.id}
      style={styles.tripCard}
      onPress={() => navigation.navigate('PropertyDetails', { propertyId: trip.id })}
    >
      <Image source={{ uri: trip.propertyImage }} style={styles.propertyImage} />
      <View style={styles.tripContent}>
        <View style={styles.tripHeader}>
          <Text style={styles.propertyTitle}>{trip.propertyTitle}</Text>
          <Text style={styles.location}>{trip.location}</Text>
        </View>

        <View style={styles.tripDetails}>
          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>Check-in</Text>
            <Text style={styles.date}>{formatDate(trip.checkIn)}</Text>
          </View>
          <View style={styles.dateDivider} />
          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>Check-out</Text>
            <Text style={styles.date}>{formatDate(trip.checkOut)}</Text>
          </View>
        </View>

        <View style={styles.hostInfo}>
          <Image source={{ uri: trip.hostImage }} style={styles.hostImage} />
          <Text style={styles.hostedBy}>Hosted by {trip.hostName}</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.price}>{trip.totalPrice}﷼ total</Text>
          <Pressable 
            style={styles.messageButton}
            onPress={() => navigation.navigate('Inbox')}
          >
            <Ionicons name="chatbubble-outline" size={20} color="#222222" />
            <Text style={styles.messageButtonText}>Message host</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Trips</Text>
        <View style={styles.tabs}>
          <Pressable
            style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
            onPress={() => setActiveTab('upcoming')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'upcoming' && styles.activeTabText
            ]}>
              Upcoming
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === 'past' && styles.activeTab]}
            onPress={() => setActiveTab('past')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'past' && styles.activeTabText
            ]}>
              Past
            </Text>
          </Pressable>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {filteredTrips.length > 0 ? (
          filteredTrips.map(renderTripCard)
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="airplane-outline" size={48} color="#717171" />
            <Text style={styles.emptyStateTitle}>No {activeTab} trips</Text>
            <Text style={styles.emptyStateText}>
              {activeTab === 'upcoming'
                ? "Time to start planning your next adventure!"
                : "You haven't completed any trips yet."}
            </Text>
            <Pressable 
              style={styles.exploreButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.exploreButtonText}>Start exploring</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#222222',
    marginBottom: 16,
  },
  tabs: {
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: '#F7F7F7',
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#717171',
  },
  activeTabText: {
    color: '#222222',
  },
  content: {
    padding: 16,
  },
  tripCard: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  propertyImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  tripContent: {
    padding: 16,
  },
  tripHeader: {
    marginBottom: 16,
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#717171',
  },
  tripDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EBEBEB',
  },
  dateContainer: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 12,
    color: '#717171',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    fontWeight: '500',
    color: '#222222',
  },
  dateDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#EBEBEB',
    marginHorizontal: 16,
  },
  hostInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  hostImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  hostedBy: {
    fontSize: 14,
    color: '#222222',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#EBEBEB',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222222',
  },
  messageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  messageButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#222222',
    marginLeft: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222222',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#717171',
    textAlign: 'center',
    marginBottom: 24,
  },
  exploreButton: {
    backgroundColor: '#FF385C',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  exploreButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
