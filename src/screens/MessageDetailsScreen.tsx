import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Pressable,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  LucideChevronLeft,
  LucideSend,
  LucideImage,
  LucideMapPin,
  LucideMoreVertical,
  LucideCheck,
  LucideCheckCheck,
} from 'lucide-react-native';
import { useTheme } from '../theme/useTheme';
import { RootStackParamList } from '../navigation/types';
import { Message, ChatMessage } from '../types/message';
import { Text } from '../components/Text';
import { mockMessages } from '../data/mockMessages';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const MessageDetailsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);
  
  // Get message from route params or mock data
  const messageId = (route.params as any)?.messageId;
  const message = mockMessages.find(m => m.id === messageId) || mockMessages[0];
  
  const [newMessage, setNewMessage] = useState('');
  const [isComposing, setIsComposing] = useState(false);

  const handleSend = useCallback(() => {
    if (!newMessage.trim()) return;

    const chatMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'currentUser',
      text: newMessage.trim(),
      timestamp: new Date(),
      status: 'sent',
      type: 'text',
    };

    // In a real app, you would send this to your backend
    console.log('Sending message:', chatMessage);
    
    setNewMessage('');
    Keyboard.dismiss();
  }, [newMessage]);

  const renderMessage = useCallback(({ item: msg }: { item: ChatMessage }) => {
    const isUser = msg.senderId === 'currentUser';
    
    return (
      <View style={[
        styles.messageContainer,
        isUser ? styles.userMessage : styles.otherMessage
      ]}>
        {!isUser && (
          <Image
            source={{ uri: message.senderAvatar }}
            style={styles.messageAvatar}
          />
        )}
        
        <View style={[
          styles.messageBubble,
          {
            backgroundColor: isUser ? colors.primary : colors.card,
            borderBottomLeftRadius: !isUser ? 0 : 12,
            borderBottomRightRadius: isUser ? 0 : 12,
          }
        ]}>
          {msg.type === 'image' && (
            <Image
              source={{ uri: msg.imageUrl }}
              style={styles.messageImage}
              resizeMode="cover"
            />
          )}
          
          <Text style={[
            styles.messageText,
            { color: isUser ? colors.buttonText : colors.text }
          ]}>
            {msg.text}
          </Text>
          
          <View style={styles.messageFooter}>
            <Text style={[
              styles.messageTime,
              { color: isUser ? colors.buttonText : colors.textSecondary }
            ]}>
              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
            
            {isUser && (
              <View style={styles.messageStatus}>
                {msg.status === 'read' ? (
                  <LucideCheckCheck size={16} color={colors.buttonText} />
                ) : (
                  <LucideCheck size={16} color={colors.buttonText} />
                )}
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }, [colors, message.senderAvatar]);

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      {/* Header */}
      <View style={[
        styles.header,
        {
          backgroundColor: colors.background,
          paddingTop: insets.top,
          borderBottomColor: colors.border
        }
      ]}>
        <TouchableOpacity
          onPress={navigation.goBack}
          style={styles.backButton}
        >
          <LucideChevronLeft size={24} color={colors.text} />
        </TouchableOpacity>

        <Pressable style={styles.headerInfo}>
          <Image
            source={{ uri: message.senderAvatar }}
            style={styles.avatar}
          />
          <View style={styles.headerText}>
            <Text style={[styles.name, { color: colors.text }]}>
              {message.senderName}
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              {message.listingTitle}
            </Text>
          </View>
        </Pressable>

        <TouchableOpacity style={styles.moreButton}>
          <LucideMoreVertical size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={message.messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
        inverted={false}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      {/* Input */}
      <View style={[styles.inputContainer, { borderTopColor: colors.border }]}>
        <TouchableOpacity style={styles.attachButton}>
          <LucideImage size={24} color={colors.primary} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.attachButton}>
          <LucideMapPin size={24} color={colors.primary} />
        </TouchableOpacity>

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.card,
              color: colors.text,
            }
          ]}
          placeholder="Type a message..."
          placeholderTextColor={colors.textSecondary}
          value={newMessage}
          onChangeText={setNewMessage}
          multiline
          maxLength={1000}
          onFocus={() => setIsComposing(true)}
          onBlur={() => setIsComposing(false)}
        />

        <TouchableOpacity
          style={[
            styles.sendButton,
            { opacity: newMessage.trim() ? 1 : 0.5 }
          ]}
          onPress={handleSend}
          disabled={!newMessage.trim()}
        >
          <LucideSend size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 13,
  },
  moreButton: {
    marginLeft: 12,
  },
  messagesList: {
    padding: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  otherMessage: {
    alignSelf: 'flex-start',
  },
  messageAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
    alignSelf: 'flex-end',
  },
  messageBubble: {
    borderRadius: 12,
    padding: 12,
  },
  messageImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  messageTime: {
    fontSize: 12,
    marginRight: 4,
  },
  messageStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    borderTopWidth: 1,
  },
  attachButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    marginHorizontal: 8,
    padding: 12,
    borderRadius: 20,
    maxHeight: 120,
    fontSize: 16,
  },
  sendButton: {
    padding: 8,
  },
}); 