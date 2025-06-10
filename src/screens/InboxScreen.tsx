import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/useTheme';
import { RootStackParamList } from '../navigation/types';
import { Message } from '../types/message';
import { mockMessages } from '../data/mockMessages';
import { MessageCard } from '../components/MessageCard';
import { Text } from '../components/Text';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const InboxScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>(
    // Sort messages by date, newest first
    [...mockMessages].sort((a, b) => b.lastMessageAt.getTime() - a.lastMessageAt.getTime())
  );

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    // TODO: Implement real refresh logic with Firebase
    // For now, just simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  }, []);

  const handleMessagePress = useCallback((message: Message) => {
    // Mark message as read
    setMessages(prevMessages =>
      prevMessages.map(msg =>
        msg.id === message.id ? { ...msg, read: true } : msg
      )
    );

    // Navigate to message details
    navigation.navigate('MessageDetails', { messageId: message.id });
  }, [navigation]);

  const renderItem = useCallback(({ item }: { item: Message }) => (
    <MessageCard
      message={item}
      onPress={handleMessagePress}
    />
  ), [handleMessagePress]);

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
        No messages yet
      </Text>
      <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
        When you book a property or receive a message,{'\n'}
        it will appear here
      </Text>
    </View>
  );

  const renderHeader = () => (
    <View style={[styles.header, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        Messages
      </Text>
      {messages.some(msg => !msg.read) && (
        <View style={[styles.badge, { backgroundColor: colors.primary }]}>
          <Text style={[styles.badgeText, { color: colors.buttonText }]}>
            {messages.filter(msg => !msg.read).length}
          </Text>
        </View>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={[
      styles.container,
      { backgroundColor: colors.background, paddingTop: insets.top }
    ]}>
      {renderHeader()}
      
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={messages.length === 0 && styles.emptyList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  badge: {
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    minWidth: 24,
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyList: {
    flexGrow: 1,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});
