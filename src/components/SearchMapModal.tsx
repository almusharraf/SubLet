import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import MapView, { Marker, Callout } from 'react-native-maps';
import { X } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { Property } from '../data/properties';

interface SearchMapModalProps {
  isVisible: boolean;
  onClose: () => void;
  properties: Property[];
  onPropertyPress: (propertyId: string) => void;
}

const { width, height } = Dimensions.get('window');

export const SearchMapModal: React.FC<SearchMapModalProps> = ({
  isVisible,
  onClose,
  properties,
  onPropertyPress,
}) => {
  const initialRegion = {
    latitude: properties[0]?.coordinates.latitude || 43.1729,
    longitude: properties[0]?.coordinates.longitude || 6.5256,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      swipeDirection={['down']}
      style={styles.modal}
      propagateSwipe
      backdropOpacity={0.3}
    >
      <View style={styles.container}>
        <View style={styles.handle} />
        
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <X size={24} color={colors.black} />
        </TouchableOpacity>

        <MapView
          style={styles.map}
          initialRegion={initialRegion}
        >
          {properties.map(property => (
            <Marker
              key={property.id}
              coordinate={property.coordinates}
              onPress={() => onPropertyPress(property.id)}
            >
              <View style={styles.markerContainer}>
                <Text style={styles.markerPrice}>${property.price}</Text>
              </View>
              <Callout>
                <View style={styles.callout}>
                  <Text style={styles.calloutTitle} numberOfLines={1}>
                    {property.title}
                  </Text>
                  <Text style={styles.calloutPrice}>
                    ${property.price} / night
                  </Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
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
    backgroundColor: colors.white,
    height: height * 0.8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  closeButton: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.lg,
    zIndex: 1,
    backgroundColor: colors.white,
    borderRadius: 50,
    padding: spacing.xs,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  map: {
    flex: 1,
    width: '100%',
  },
  markerContainer: {
    backgroundColor: colors.primary,
    padding: spacing.xs,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.white,
  },
  markerPrice: {
    ...typography.caption,
    color: colors.white,
    fontWeight: '600',
  },
  callout: {
    padding: spacing.sm,
    minWidth: 150,
  },
  calloutTitle: {
    ...typography.bodySmall,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  calloutPrice: {
    ...typography.caption,
    color: colors.gray,
  },
}); 