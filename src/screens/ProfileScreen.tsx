import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
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
} from 'lucide-react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useTheme } from '../theme/useTheme';
import { spacing, typography, borderRadius } from '../theme/theme';
import { currentUser } from '../data/user';
import { RootStackParamList } from '../navigation/types';

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

export const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, theme, toggleTheme } = useTheme();

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
          <SettingItem
            label="Logout"
            icon={<LucideLogOut size={24} color={colors.error} />}
            onPress={handleLogout}
            danger
          />
        </View>

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
});
