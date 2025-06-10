import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Platform,
} from 'react-native';
import { LucideCheck } from 'lucide-react-native';
import { useTheme } from '../theme/useTheme';
import { Message } from '../types/message';

interface MessageCardProps {
  message: Message;
  onPress: (message: Message) => void;
}

export const MessageCard: React.FC<MessageCardProps> = ({ message, onPress }) => {
  const { colors } = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: colors.card },
        pressed && Platform.OS === 'ios' && { opacity: 0.7 },
        pressed && Platform.OS === 'android' && { backgroundColor: colors.border }
      ]}
      onPress={() => onPress(message)}
      android_ripple={{ color: colors.border }}
    >
      <Image source={{ uri: message.senderAvatar }} style={styles.avatar} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text 
            style={[
              styles.name,
              { color: colors.text },
              !message.read && styles.unread
            ]}
            numberOfLines={1}
          >
            {message.senderName}
          </Text>
          <Text style={[styles.timestamp, { color: colors.textSecondary }]}>
            {message.timestamp}
          </Text>
        </View>

        <Text 
          style={[
            styles.title,
            { color: colors.text },
            !message.read && styles.unread
          ]}
          numberOfLines={1}
        >
          {message.listingTitle}
        </Text>

        <View style={styles.previewContainer}>
          <Text 
            style={[
              styles.preview,
              { color: colors.textSecondary },
              !message.read && styles.unread
            ]}
            numberOfLines={1}
          >
            {message.preview}
          </Text>
          {message.read ? (
            <LucideCheck size={16} color={colors.primary} />
          ) : (
            <View style={[styles.unreadDot, { backgroundColor: colors.primary }]} />
          )}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    flex: 1,
    marginRight: 8,
  },
  timestamp: {
    fontSize: 12,
  },
  title: {
    fontSize: 14,
    marginBottom: 4,
  },
  previewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  preview: {
    fontSize: 14,
    flex: 1,
    marginRight: 8,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  unread: {
    fontWeight: '600',
  },
}); 