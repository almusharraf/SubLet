import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageCircle } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { conversations } from '../data/messages';

const MessagePreview = ({ conversation }) => {
  const { participants, lastMessage, unreadCount } = conversation;
  const host = participants[0];

  return (
    <Pressable style={styles.messageItem}>
      <Image source={{ uri: host.avatar }} style={styles.avatar} />
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.hostName}>{host.name}</Text>
          <Text style={styles.timestamp}>
            {new Date(lastMessage.timestamp).toLocaleDateString()}
          </Text>
        </View>
        <Text style={styles.messageText} numberOfLines={2}>
          {lastMessage.text}
        </Text>
      </View>
      {unreadCount > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadCount}>{unreadCount}</Text>
        </View>
      )}
    </Pressable>
  );
};

export const InboxScreen = () => {
  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <MessageCircle size={48} color={colors.gray} />
      <Text style={styles.emptyTitle}>No messages yet</Text>
      <Text style={styles.emptyText}>
        When you book a stay or send a message to a host, you'll see your conversations here
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        {conversations.length > 0 && (
          <Text style={styles.subtitle}>
            {conversations.length} {conversations.length === 1 ? 'conversation' : 'conversations'}
          </Text>
        )}
      </View>

      <FlatList
        data={conversations}
        renderItem={({ item }) => <MessagePreview conversation={item} />}
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
    flexGrow: 1,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: spacing.md,
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  hostName: {
    ...typography.body,
    fontWeight: '600',
  },
  timestamp: {
    ...typography.caption,
    color: colors.gray,
  },
  messageText: {
    ...typography.bodySmall,
    color: colors.gray,
  },
  unreadBadge: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.md,
  },
  unreadCount: {
    ...typography.caption,
    color: colors.white,
    fontWeight: '600',
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
