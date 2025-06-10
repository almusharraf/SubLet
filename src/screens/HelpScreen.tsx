import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LucideChevronLeft, LucideHelpCircle } from 'lucide-react-native';
import { useTheme } from '../theme/useTheme';
import { spacing, typography } from '../theme/theme';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface HelpItem {
  id: string;
  title: string;
  description: string;
}

const helpItems: HelpItem[] = [
  {
    id: '1',
    title: 'Booking Support',
    description: 'Get help with your bookings, payments, and reservations.',
  },
  {
    id: '2',
    title: 'Account Settings',
    description: 'Manage your profile, notifications, and privacy settings.',
  },
  {
    id: '3',
    title: 'Safety Center',
    description: 'Learn about our safety measures and guest protection policies.',
  },
  {
    id: '4',
    title: 'Contact Us',
    description: 'Reach our support team 24/7 for any assistance.',
  },
];

export const HelpScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.background,
            borderColor: colors.border,
            paddingTop: insets.top,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <LucideChevronLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Help & Support
        </Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: colors.surface }]}>
          <LucideHelpCircle size={48} color={colors.primary} />
        </View>
        
        <Text style={[styles.welcomeText, { color: colors.text }]}>
          How can we help you?
        </Text>
        
        <View style={styles.helpItems}>
          {helpItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.helpItem, { backgroundColor: colors.surface }]}
              onPress={() => {}}
            >
              <Text style={[styles.helpItemTitle, { color: colors.text }]}>
                {item.title}
              </Text>
              <Text style={[styles.helpItemDescription, { color: colors.textSecondary }]}>
                {item.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.contactSection}>
          <Text style={[styles.contactText, { color: colors.textSecondary }]}>
            Still need help? Contact our support team directly:
          </Text>
          <TouchableOpacity
            style={[styles.contactButton, { backgroundColor: colors.primary }]}
            onPress={() => {}}
          >
            <Text style={[styles.contactButtonText, { color: colors.white }]}>
              Contact Support
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: spacing.headerHeight + 44,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingHorizontal: spacing.lg,
  },
  backButton: {
    marginRight: spacing.md,
  },
  headerTitle: {
    ...typography.h3,
    flex: 1,
  },
  content: {
    flex: 1,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  welcomeText: {
    ...typography.h2,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  helpItems: {
    padding: spacing.lg,
  },
  helpItem: {
    padding: spacing.lg,
    borderRadius: 12,
    marginBottom: spacing.md,
  },
  helpItemTitle: {
    ...typography.h4,
    marginBottom: spacing.xs,
  },
  helpItemDescription: {
    ...typography.body,
  },
  contactSection: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  contactText: {
    ...typography.body,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  contactButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 8,
  },
  contactButtonText: {
    ...typography.button,
  },
}); 