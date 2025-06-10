import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Button, Text, Slider } from 'react-native-paper';
import MapView, { Circle, Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';

interface MapRadiusSelectorProps {
  onSelect: (location: {
    latitude: number;
    longitude: number;
    name: string;
  }, radius: number) => void;
  onClose: () => void;
}

const MapRadiusSelector: React.FC<MapRadiusSelectorProps> = ({ onSelect, onClose }) => {
  const [region, setRegion] = useState({
    latitude: 24.7136,  // Riyadh coordinates
    longitude: 46.6753,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [radius, setRadius] = useState(30); // minutes
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setRegion({
          ...region,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }
      setLoading(false);
    })();
  }, []);

  const handleConfirm = () => {
    onSelect(
      {
        latitude: region.latitude,
        longitude: region.longitude,
        name: selectedLocation,
      },
      radius
    );
    onClose();
  };

  // Convert minutes to meters for the map circle (rough estimation)
  const minutesToMeters = (minutes: number) => {
    const averageSpeedKmH = 40; // Average speed in city
    const distanceKm = (averageSpeedKmH / 60) * minutes;
    return distanceKm * 1000; // Convert to meters
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder="Search location"
          onPress={(data, details = null) => {
            if (details) {
              setRegion({
                ...region,
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              });
              setSelectedLocation(data.description);
            }
          }}
          query={{
            key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
            language: 'en',
            components: 'country:sa',
          }}
          styles={{
            container: styles.searchInputContainer,
            textInput: styles.searchInput,
          }}
        />
      </View>

      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
      >
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
        />
        <Circle
          center={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          radius={minutesToMeters(radius)}
          fillColor="rgba(0, 150, 255, 0.2)"
          strokeColor="rgba(0, 150, 255, 0.5)"
          strokeWidth={2}
        />
      </MapView>

      <View style={styles.controls}>
        <Text style={styles.radiusText}>
          Commute time: {radius} minutes
        </Text>
        <Slider
          value={radius}
          minimumValue={5}
          maximumValue={60}
          step={5}
          onValueChange={setRadius}
        />
        <View style={styles.buttonContainer}>
          <Button mode="outlined" onPress={onClose} style={styles.button}>
            Cancel
          </Button>
          <Button
            mode="contained"
            onPress={handleConfirm}
            style={styles.button}
            disabled={!selectedLocation}
          >
            Confirm
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    zIndex: 1,
  },
  searchInputContainer: {
    flex: 0,
  },
  searchInput: {
    height: 48,
    fontSize: 16,
    backgroundColor: 'white',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 200,
  },
  controls: {
    padding: 16,
    backgroundColor: 'white',
  },
  radiusText: {
    textAlign: 'center',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});

export default MapRadiusSelector; 