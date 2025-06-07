import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LucideCheck } from 'lucide-react-native';
import { useTheme } from '../theme/useTheme';
import { spacing, typography } from '../theme/theme';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Mock data for messages
const mockMessages = [
  {
    id: '1',
    sender: {
      name: 'Fahad Sultan',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    propertyTitle: 'Luxury Villa in Riyadh',
    lastMessage: 'Thank you for your booking! Looking forward to hosting you.',
    timestamp: new Date('2024-03-15T10:30:00'),
    unread: true,
  },
  {
    id: '2',
    sender: {
      name: 'Noura Rashid',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    propertyTitle: 'Modern Apartment in Jeddah',
    lastMessage: 'Your check-in instructions will be sent 24 hours before arrival.',
    timestamp: new Date('2024-03-14T15:45:00'),
    unread: false,
  },
  {
    id: '3',
    sender: {
      name: 'Omar Ahmed',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    propertyTitle: 'Traditional House in AlUla',
    lastMessage: 'We hope you enjoyed your stay! Please leave a review.',
    timestamp: new Date('2024-03-13T09:15:00'),
    unread: false,
  },
];

export const InboxScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

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
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Inbox
        </Text>
      </View>

      <ScrollView style={styles.content}>
        {mockMessages.map((message) => (
          <TouchableOpacity
            key={message.id}
            style={[
              styles.messageRow,
              { borderColor: colors.border },
              message.unread && { backgroundColor: colors.surface },
            ]}
            onPress={() => {}}
          >
            <Image
              source={{ uri: message.sender.avatar }}
              style={styles.avatar}
            />
            <View style={styles.messageContent}>
              <View style={styles.messageHeader}>
                <Text style={[styles.senderName, { color: colors.text }]}>
                  {message.sender.name}
                </Text>
                <Text
                  style={[styles.timestamp, { color: colors.textSecondary }]}
                >
                  {formatTimestamp(message.timestamp)}
                </Text>
              </View>
              <Text style={[styles.propertyTitle, { color: colors.text }]}>
                {message.propertyTitle}
              </Text>
              <Text
                style={[
                  styles.lastMessage,
                  { color: colors.textSecondary },
                ]}
                numberOfLines={2}
              >
                {message.lastMessage}
              </Text>
            </View>
            {!message.unread && (
              <View style={styles.readIndicator}>
                <LucideCheck size={16} color={colors.success} />
              </View>
            )}
          </TouchableOpacity>
        ))}
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
  headerTitle: {
    ...typography.h3,
    flex: 1,
  },
  content: {
    flex: 1,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  messageContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  senderName: {
    ...typography.body,
    fontWeight: '600',
  },
  timestamp: {
    ...typography.bodySmall,
  },
  propertyTitle: {
    ...typography.bodySmall,
    marginBottom: spacing.xs,
  },
  lastMessage: {
    ...typography.bodySmall,
  },
  readIndicator: {
    marginLeft: spacing.md,
  },
});
