import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import MapView, { Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT, Region } from 'react-native-maps';
import { useTheme } from '../theme/ThemeContext';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { LucideMapPin, LucideX } from 'lucide-react-native';
import { Platform } from 'react-native';

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

interface SearchMapModalProps {
  isVisible: boolean;
  onClose: () => void;
  properties: Property[];
  onPropertyPress: (id: string) => void;
}

export const SearchMapModal: React.FC<SearchMapModalProps> = ({
  isVisible,
  onClose,
  properties,
  onPropertyPress,
}) => {
  const { colors, isDark } = useTheme();
  const [selectedProperty, setSelectedProperty] = React.useState<string | null>(null);

  const handleMarkerPress = (propertyId: string) => {
    setSelectedProperty(propertyId);
  };

  const initialRegion = properties.length > 0 ? {
    latitude: properties[0].coordinates.latitude,
    longitude: properties[0].coordinates.longitude,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  } : {
    latitude: 24.7136, // Riyadh coordinates as default
    longitude: 46.6753,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      style={styles.modal}
      propagateSwipe
      backdropOpacity={0.5}
      statusBarTranslucent
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <LucideX size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text }]}>Map View</Text>
        </View>

        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={initialRegion}
            userInterfaceStyle={isDark ? 'dark' : 'light'}
          >
            {properties.map((property) => (
              <Marker
                key={property.id}
                coordinate={property.coordinates}
                onPress={() => handleMarkerPress(property.id)}
              >
                <View style={[styles.marker, { backgroundColor: colors.primary }]}>
                  <LucideMapPin size={16} color={colors.white} />
                  <Text style={[styles.markerPrice, { color: colors.white }]}>
                    ﷼{property.price}
                  </Text>
                </View>
              </Marker>
            ))}
          </MapView>
        </View>

        <ScrollView
          style={[styles.propertiesList, { backgroundColor: colors.background }]}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.propertiesListContent}
        >
          {properties.map((property) => (
            <TouchableOpacity
              key={property.id}
              style={[
                styles.propertyCard,
                { 
                  backgroundColor: colors.surface,
                  borderColor: selectedProperty === property.id ? colors.primary : colors.border
                },
              ]}
              onPress={() => onPropertyPress(property.id)}
            >
              <Text
                style={[styles.propertyTitle, { color: colors.text }]}
                numberOfLines={2}
              >
                {property.title}
              </Text>
              <Text
                style={[styles.propertyLocation, { color: colors.textSecondary }]}
                numberOfLines={1}
              >
                {property.location}
              </Text>
              <Text style={[styles.propertyPrice, { color: colors.text }]}>
                ﷼{property.price} <Text style={{ color: colors.textSecondary }}>night</Text>
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    height: '90%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
  },
  closeButton: {
    marginRight: spacing.md,
  },
  title: {
    ...typography.h3,
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  marker: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.xs,
    borderRadius: 8,
  },
  markerPrice: {
    ...typography.caption,
    fontWeight: '600',
    marginLeft: spacing.xs,
  },
  propertiesList: {
    maxHeight: 180,
    borderTopWidth: 1,
  },
  propertiesListContent: {
    padding: spacing.md,
  },
  propertyCard: {
    width: 200,
    padding: spacing.md,
    marginRight: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
  },
  propertyTitle: {
    ...typography.bodySmall,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  propertyLocation: {
    ...typography.caption,
    marginBottom: spacing.xs,
  },
  propertyPrice: {
    ...typography.body,
  },
});
