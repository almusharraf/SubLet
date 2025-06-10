import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  LucideWallet,
  LucideHeart,
  LucideBell,
  LucideHelpCircle,
  LucideLogOut,
  LucideChevronRight,
  LucideMoon,
  LucideUser,
  LucideCreditCard,
  LucideSettings,
  LucideCalendar,
} from 'lucide-react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useTheme } from '../theme/useTheme';
import { spacing, typography, borderRadius } from '../theme/theme';
import { currentUser } from '../data/user';
import { RootStackParamList } from '../navigation/types';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface SettingItemProps {
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
  rightElement?: React.ReactNode;
  danger?: boolean;
}

const SettingItem: React.FC<SettingItemProps> = ({ 
  label, 
  icon, 
  onPress, 
  rightElement,
  danger 
}) => {
  const { colors } = useTheme();
  
  return (
    <TouchableOpacity
      style={[styles.settingItem, { borderBottomColor: colors.border }]}
      onPress={onPress}
    >
      {icon}
      <Text style={[
        styles.settingLabel, 
        { color: danger ? colors.error : colors.text }
      ]}>
        {label}
      </Text>
      {rightElement || <LucideChevronRight size={20} color={danger ? colors.error : colors.text} />}
    </TouchableOpacity>
  );
};

interface Trip {
  id: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  status: string;
  property: {
    title: string;
    location: string;
    imageUrl: string;
    price: number;
  };
}

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, theme, toggleTheme } = useTheme();
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'trips'>('profile');
  const [trips, setTrips] = useState<Trip[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTrips = async () => {
    if (!user) return;

    try {
      const tripsRef = collection(db, 'user_trips', user.uid, 'bookings');
      const q = query(
        tripsRef,
        orderBy('startDate', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const fetchedTrips = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        startDate: doc.data().startDate.toDate(),
        endDate: doc.data().endDate.toDate(),
      })) as Trip[];

      setTrips(fetchedTrips);
    } catch (error) {
      console.error('Error fetching trips:', error);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, [user]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTrips();
    setRefreshing(false);
  };

  const handleWalletPress = () => {
    navigation.navigate('Wallet');
  };

  const handleAddCardPress = () => {
    navigation.navigate('AddCard');
  };

  const handleHelpPress = () => {
    navigation.navigate('Help');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // The AuthContext will handle the navigation automatically
    } catch (error) {
      console.error('Logout failed:', error);
      Alert.alert(
        'Logout Failed',
        'There was an error logging out. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const renderProfileTab = () => (
    <View style={styles.section}>
      <TouchableOpacity
        style={[styles.menuItem, { borderBottomColor: colors.border }]}
        onPress={() => navigation.navigate('Settings')}
      >
        <View style={styles.menuItemLeft}>
          <LucideSettings size={24} color={colors.text} />
          <Text style={[styles.menuItemText, { color: colors.text }]}>
            Settings
          </Text>
        </View>
        <LucideChevronRight size={20} color={colors.textSecondary} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.menuItem, { borderBottomColor: colors.border }]}
        onPress={() => navigation.navigate('Wishlist')}
      >
        <View style={styles.menuItemLeft}>
          <LucideHeart size={24} color={colors.text} />
          <Text style={[styles.menuItemText, { color: colors.text }]}>
            Saved Properties
          </Text>
        </View>
        <LucideChevronRight size={20} color={colors.textSecondary} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.menuItem, { borderBottomColor: colors.border }]}
        onPress={handleLogout}
      >
        <View style={styles.menuItemLeft}>
          <LucideLogOut size={24} color={colors.error} />
          <Text style={[styles.menuItemText, { color: colors.error }]}>
            Log Out
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderTripsTab = () => (
    <View style={styles.section}>
      {trips.map((trip) => (
        <TouchableOpacity
          key={trip.id}
          style={[styles.tripCard, { backgroundColor: colors.surface }]}
          onPress={() => navigation.navigate('BookingConfirmation', {
            bookingId: trip.id,
            propertyId: trip.id,
          })}
        >
          <View style={styles.tripHeader}>
            <Text style={[styles.tripTitle, { color: colors.text }]}>
              {trip.property.title}
            </Text>
            <Text style={[styles.tripPrice, { color: colors.primary }]}>
              ﷼{trip.totalPrice.toLocaleString()}
            </Text>
          </View>

          <Text style={[styles.tripLocation, { color: colors.textSecondary }]}>
            {trip.property.location}
          </Text>

          <View style={styles.tripDates}>
            <LucideCalendar size={16} color={colors.textSecondary} />
            <Text style={[styles.tripDateText, { color: colors.textSecondary }]}>
              {trip.startDate.toLocaleDateString()} - {trip.endDate.toLocaleDateString()}
            </Text>
          </View>

          <View style={[styles.tripStatus, { backgroundColor: colors.primary + '20' }]}>
            <Text style={[styles.tripStatusText, { color: colors.primary }]}>
              {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
            </Text>
          </View>
        </TouchableOpacity>
      ))}

      {trips.length === 0 && (
        <View style={styles.emptyState}>
          <LucideCalendar size={48} color={colors.textSecondary} />
          <Text style={[styles.emptyStateTitle, { color: colors.text }]}>
            No trips yet
          </Text>
          <Text style={[styles.emptyStateText, { color: colors.textSecondary }]}>
            When you book a property, it will appear here
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, {
        backgroundColor: colors.background,
        borderBottomColor: colors.border
      }]}>
        <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
      </View>

      <ScrollView>
        <View style={[styles.profileSection, { backgroundColor: colors.background }]}>
          <View style={[styles.avatarContainer, { backgroundColor: colors.surface }]}>
            <LucideUser size={40} color={colors.text} />
          </View>
          <Text style={[styles.name, { color: colors.text }]}>{currentUser.name}</Text>
          <Text style={[styles.email, { color: colors.textSecondary }]}>{currentUser.email}</Text>
        </View>

        <View style={[styles.section, { backgroundColor: colors.background }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Wallet</Text>
          <View style={[styles.walletCard, { backgroundColor: colors.surface }]}>
            <View style={styles.walletHeader}>
              <Text style={[styles.balanceLabel, { color: colors.textSecondary }]}>
                Available Balance
              </Text>
              <Text style={[styles.balance, { color: colors.text }]}>
                ﷼ 2,500.00
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.addMoneyButton, { backgroundColor: colors.primary }]}
              onPress={handleWalletPress}
            >
              <Text style={[styles.addMoneyText, { color: colors.white }]}>
                Add Money
              </Text>
            </TouchableOpacity>
          </View>
          <SettingItem
            label="Payment Methods"
            icon={<LucideCreditCard size={24} color={colors.text} />}
            onPress={handleAddCardPress}
          />
        </View>

        <View style={[styles.section, { backgroundColor: colors.background }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Preferences</Text>
          <SettingItem
            label="Dark Mode"
            icon={<LucideMoon size={24} color={colors.text} />}
            onPress={toggleTheme}
            rightElement={
              <Switch
                value={theme === 'dark'}
                onValueChange={toggleTheme}
                trackColor={{ false: colors.border, true: colors.primary }}
              />
            }
          />
          <SettingItem
            label="Help"
            icon={<LucideHelpCircle size={24} color={colors.text} />}
            onPress={handleHelpPress}
          />
        </View>

        <View style={[styles.section, { backgroundColor: colors.background }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Trips</Text>
          <View style={[styles.tabs, { borderBottomColor: colors.border }]}>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'profile' && { borderBottomColor: colors.primary },
              ]}
              onPress={() => setActiveTab('profile')}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: activeTab === 'profile' ? colors.primary : colors.textSecondary },
                ]}
              >
                Profile
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'trips' && { borderBottomColor: colors.primary },
              ]}
              onPress={() => setActiveTab('trips')}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: activeTab === 'trips' ? colors.primary : colors.textSecondary },
                ]}
              >
                Trips
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
            />
          }
        >
          {activeTab === 'profile' ? renderProfileTab() : renderTripsTab()}
        </ScrollView>

        <Text style={[styles.version, { color: colors.textSecondary }]}>
          Version 1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  title: {
    ...typography.h2,
  },
  profileSection: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  name: {
    ...typography.h3,
    marginBottom: spacing.xs,
  },
  email: {
    ...typography.body,
  },
  section: {
    marginTop: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
  },
  settingLabel: {
    ...typography.body,
    flex: 1,
    marginLeft: spacing.md,
  },
  version: {
    ...typography.caption,
    textAlign: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  walletCard: {
    margin: spacing.lg,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
  },
  walletHeader: {
    marginBottom: spacing.md,
  },
  balanceLabel: {
    ...typography.bodySmall,
    marginBottom: spacing.xs,
  },
  balance: {
    ...typography.h2,
  },
  addMoneyButton: {
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  addMoneyText: {
    ...typography.buttonText,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    ...typography.button,
  },
  content: {
    flexGrow: 1,
    padding: spacing.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  menuItemText: {
    ...typography.button,
  },
  tripCard: {
    padding: spacing.md,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  tripTitle: {
    ...typography.subtitle,
    flex: 1,
    marginRight: spacing.sm,
  },
  tripPrice: {
    ...typography.subtitle,
    fontWeight: '600',
  },
  tripLocation: {
    ...typography.body,
    marginBottom: spacing.sm,
  },
  tripDates: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  tripDateText: {
    ...typography.caption,
  },
  tripStatus: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 16,
  },
  tripStatusText: {
    ...typography.caption,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl * 2,
  },
  emptyStateTitle: {
    ...typography.h3,
    marginTop: spacing.lg,
    marginBottom: spacing.xs,
  },
  emptyStateText: {
    ...typography.body,
    textAlign: 'center',
  },
});
