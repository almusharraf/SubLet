import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { properties } from '../data/properties';
import { currentUser } from '../data/user';
import { PropertyCard } from '../components/PropertyCard';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const WishlistScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const savedProperties = properties.filter(property =>
    currentUser.savedProperties.includes(property.id)
  );

  const handlePropertyPress = (propertyId: string) => {
    navigation.navigate('PropertyDetails', { propertyId });
  };

  const handleSaveProperty = (propertyId: string) => {
    // TODO: Implement save/unsave functionality
    console.log('Toggle save property:', propertyId);
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Heart size={48} color={colors.gray} />
      <Text style={styles.emptyTitle}>No saved properties yet</Text>
      <Text style={styles.emptyText}>
        Start saving properties you like by tapping the heart icon
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Saved Properties</Text>
        <Text style={styles.subtitle}>
          {savedProperties.length} {savedProperties.length === 1 ? 'property' : 'properties'}
        </Text>
      </View>

      <FlatList
        data={savedProperties}
        renderItem={({ item }) => (
          <PropertyCard
            property={item}
            onPress={() => handlePropertyPress(item.id)}
            onSave={() => handleSaveProperty(item.id)}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.content}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.lg,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.gray,
  },
  content: {
    padding: spacing.screenPadding,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
  },
  emptyTitle: {
    ...typography.h2,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptyText: {
    ...typography.body,
    color: colors.gray,
    textAlign: 'center',
  },
}); 