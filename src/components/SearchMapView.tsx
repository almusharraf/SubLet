import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useTheme } from '../theme/useTheme';
import { Property } from '../types/property';

interface SearchMapViewProps {
  properties: Property[];
  selectedPropertyId?: string;
  onMarkerPress: (propertyId: string) => void;
  style?: any;
}

// Riyadh region coordinates
const RIYADH_REGION = {
  latitude: 24.7136,
  longitude: 46.6753,
  latitudeDelta: 0.2, // Zoom level for city overview
  longitudeDelta: 0.2,
};

export const SearchMapView: React.FC<SearchMapViewProps> = ({
  properties,
  selectedPropertyId,
  onMarkerPress,
  style
}) => {
  const { isDark, colors } = useTheme();
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (selectedPropertyId && mapRef.current) {
      const selectedProperty = properties.find(p => p.id === selectedPropertyId);
      if (selectedProperty) {
        mapRef.current.animateToRegion({
          latitude: selectedProperty.latitude,
          longitude: selectedProperty.longitude,
          latitudeDelta: 0.02, // Closer zoom when selecting a property
          longitudeDelta: 0.02,
        }, 500);
      }
    }
  }, [selectedPropertyId]);

  return (
    <View style={[styles.container, style]}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        mapType="satellite"
        initialRegion={RIYADH_REGION}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        rotateEnabled={false}
      >
        {properties.map((property) => (
          <Marker
            key={property.id}
            coordinate={{
              latitude: property.latitude,
              longitude: property.longitude,
            }}
            onPress={() => onMarkerPress(property.id)}
          >
            <View style={[
              styles.marker,
              selectedPropertyId === property.id && styles.selectedMarker,
              { backgroundColor: selectedPropertyId === property.id ? colors.primary : colors.card }
            ]}>
              <Text style={[
                styles.markerText,
                { color: selectedPropertyId === property.id ? colors.buttonText : colors.text }
              ]}>
                {property.price.toLocaleString()} SAR
              </Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  marker: {
    padding: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minWidth: 80,
    alignItems: 'center',
  },
  selectedMarker: {
    transform: [{ scale: 1.1 }],
    zIndex: 1,
  },
  markerText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
}); 