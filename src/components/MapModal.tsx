import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import Modal from 'react-native-modal';
import MapView, { Marker } from 'react-native-maps';
import { LucideX } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

interface MapModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  location: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

const { width, height } = Dimensions.get('window');

export const MapModal: React.FC<MapModalProps> = ({
  isVisible,
  onClose,
  title,
  location,
  coordinates,
}) => {
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
          <LucideX size={24} color={colors.black} />
        </TouchableOpacity>

        <MapView
          style={styles.map}
          initialRegion={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={coordinates}
            title={title}
            description={location}
          />
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
}); 