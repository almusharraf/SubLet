import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { Marker, Region, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import { LucideMapPin, LucideX } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { RootStackParamList } from '../navigation/types';
import { properties } from '../data/properties';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SearchMapScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  const initialRegion: Region = {
    latitude: 40.7128,
    longitude: -74.0060,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const handleMarkerPress = (propertyId: string) => {
    setSelectedProperty(propertyId);
  };

  const handlePropertyPress = (propertyId: string) => {
    navigation.navigate('PropertyDetails', { propertyId });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        provider={Platform.OS === 'ios' ? PROVIDER_DEFAULT : PROVIDER_GOOGLE}
        userInterfaceStyle={isDark ? 'dark' : 'light'}
      >
        {properties.map((property) => (
          <Marker
            key={property.id}
            coordinate={property.coordinates}
            onPress={() => handleMarkerPress(property.id)}
          >
            <View
              style={[
                styles.marker,
                {
                  backgroundColor:
                    selectedProperty === property.id
                      ? colors.primaryDark
                      : colors.primary,
                  borderColor: '#FFFFFF',
                },
              ]}
            >
              <LucideMapPin size={16} color="#FFFFFF" />
              <Text style={[styles.markerPrice, { color: '#FFFFFF' }]}>
                ${property.price}
              </Text>
            </View>
          </Marker>
        ))}
      </MapView>

      <TouchableOpacity
        style={[
          styles.closeButton,
          {
            backgroundColor: colors.background,
            top: insets.top + spacing.md,
          },
        ]}
        onPress={() => navigation.goBack()}
      >
        <LucideX size={24} color={colors.text} />
      </TouchableOpacity>

      {selectedProperty && (
        <TouchableOpacity
          style={[
            styles.propertyCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              marginBottom: insets.bottom || spacing.lg,
            },
          ]}
          onPress={() => handlePropertyPress(selectedProperty)}
        >
          {properties
            .filter((p) => p.id === selectedProperty)
            .map((property) => (
              <View key={property.id}>
                <Text
                  style={[styles.propertyTitle, { color: colors.text }]}
                  numberOfLines={1}
                >
                  {property.title}
                </Text>
                <Text
                  style={[
                    styles.propertyLocation,
                    { color: colors.textSecondary },
                  ]}
                  numberOfLines={1}
                >
                  {property.location}
                </Text>
                <Text style={[styles.propertyPrice, { color: colors.text }]}>
                  ${property.price} <Text style={{ color: colors.textSecondary }}>night</Text>
                </Text>
              </View>
            ))}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  marker: {
    padding: spacing.xs,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 2,
  },
  markerPrice: {
    ...typography.bodySmall,
    marginLeft: spacing.xs,
    fontWeight: '600',
  },
  closeButton: {
    position: 'absolute',
    left: spacing.lg,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  propertyCard: {
    position: 'absolute',
    bottom: 0,
    left: spacing.lg,
    right: spacing.lg,
    padding: spacing.lg,
    borderRadius: 12,
    borderWidth: 1,
  },
  propertyTitle: {
    ...typography.h3,
    marginBottom: spacing.xs,
  },
  propertyLocation: {
    ...typography.bodySmall,
    marginBottom: spacing.sm,
  },
  propertyPrice: {
    ...typography.body,
  },
}); 