import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Settings,
  Heart,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
  LucideIcon,
} from 'lucide-react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { currentUser } from '../data/user';

interface SettingItemProps {
  icon: LucideIcon;
  label: string;
  onPress: () => void;
}

const SettingItem: React.FC<SettingItemProps> = ({ icon: Icon, label, onPress }) => (
  <Pressable style={styles.settingItem} onPress={onPress}>
    <View style={styles.settingIcon}>
      <Icon size={24} color={colors.black} />
    </View>
    <Text style={styles.settingLabel}>{label}</Text>
    <ChevronRight size={20} color={colors.gray} />
  </Pressable>
);

export const ProfileScreen = () => {
  const handleSettingPress = (setting: string) => {
    // TODO: Implement settings navigation
    console.log('Navigate to:', setting);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <Image
            source={{ uri: currentUser.avatar }}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{currentUser.name}</Text>
            <Text style={styles.email}>{currentUser.email}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <SettingItem
            icon={Settings}
            label="Account"
            onPress={() => handleSettingPress('account')}
          />
          <SettingItem
            icon={Heart}
            label="Saved"
            onPress={() => handleSettingPress('saved')}
          />
          <SettingItem
            icon={Bell}
            label="Notifications"
            onPress={() => handleSettingPress('notifications')}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <SettingItem
            icon={HelpCircle}
            label="Help Center"
            onPress={() => handleSettingPress('help')}
          />
          <SettingItem
            icon={LogOut}
            label="Log Out"
            onPress={() => handleSettingPress('logout')}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>
      </ScrollView>
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
  },
  content: {
    flex: 1,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.white,
    marginBottom: spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: spacing.lg,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    ...typography.h3,
    marginBottom: spacing.xs,
  },
  email: {
    ...typography.bodySmall,
    color: colors.gray,
  },
  section: {
    backgroundColor: colors.white,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.bodySmall,
    color: colors.gray,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingIcon: {
    marginRight: spacing.md,
  },
  settingLabel: {
    ...typography.body,
    flex: 1,
  },
  footer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  version: {
    ...typography.caption,
    color: colors.gray,
  },
});
