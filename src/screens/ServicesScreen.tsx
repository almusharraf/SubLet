import React, { useCallback } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/useTheme';
import { RootStackParamList } from '../navigation/types';
import { Service, ServiceProvider } from '../types/service';
import { useServices } from '../hooks/useServices';
import { ServiceCard } from '../components/ServiceCard';
import { Text } from '../components/Text';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Helper function to validate ServiceProvider
const isValidServiceProvider = (provider: any): provider is ServiceProvider => {
  return (
    provider &&
    typeof provider === 'object' &&
    typeof provider.id === 'string' &&
    typeof provider.name === 'string' &&
    typeof provider.avatar === 'string' &&
    typeof provider.rating === 'number' &&
    typeof provider.totalJobs === 'number'
  );
};

// Helper function to validate Service
const isValidService = (service: any): service is Service => {
  return (
    service &&
    typeof service === 'object' &&
    typeof service.id === 'string' &&
    typeof service.name === 'string' &&
    typeof service.category === 'string' &&
    typeof service.description === 'string' &&
    typeof service.price === 'number' &&
    typeof service.currency === 'string' &&
    typeof service.rating === 'number' &&
    typeof service.reviews === 'number' &&
    typeof service.imageUrl === 'string' &&
    isValidServiceProvider(service.provider)
  );
};

export const ServicesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { services, loading, error } = useServices();
  
  const numColumns = width > 500 ? 3 : 2;
  const gap = 16;
  const padding = 16;
  const cardWidth = (width - (padding * 2) - (gap * (numColumns - 1))) / numColumns;

  // Show loading state
  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Show error state
  if (error) {
    return (
      <View style={[styles.container, styles.centerContent, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.text }]}>
          Failed to load services
        </Text>
      </View>
    );
  }

  // Filter out invalid services and ensure we have an array
  const validServices = (services ?? []).filter(isValidService);

  // Log invalid services for debugging
  if (services && services.length !== validServices.length) {
    console.warn(
      '[ServicesScreen] Some services were invalid:',
      services.filter(service => !isValidService(service))
    );
  }

  // Show empty state if no valid services
  if (validServices.length === 0) {
    return (
      <View style={[styles.container, styles.centerContent, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.text }]}>
          No services available at this time
        </Text>
      </View>
    );
  }

  const handleServicePress = useCallback((service: Service) => {
    if (!service?.id) return;
    
    navigation.navigate('ServiceDetails', {
      service: {
        name: service.name,
        imageUrl: service.imageUrl,
        category: service.category,
      },
    });
  }, [navigation]);

  const renderItem = useCallback(({ item: service, index }: { item: Service; index: number }) => {
    const isLastInRow = (index + 1) % numColumns === 0;
    
    return (
      <View style={{ 
        width: cardWidth,
        marginRight: isLastInRow ? 0 : gap,
      }}>
        <ServiceCard
          service={service}
          onPress={handleServicePress}
        />
      </View>
    );
  }, [cardWidth, numColumns, gap, handleServicePress]);

  return (
    <View style={[
      styles.container,
      {
        backgroundColor: colors.background,
        paddingTop: insets.top,
      }
    ]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          Available Services
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {validServices.length} services found
        </Text>
      </View>

      <FlatList
        data={validServices}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={numColumns}
        contentContainerStyle={[
          styles.list,
          { paddingBottom: insets.bottom + 16 }
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {}}
            tintColor={colors.primary}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  list: {
    padding: 16,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
}); 