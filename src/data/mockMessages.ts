import { Message, ChatMessage } from '../types/message';

const generateChatHistory = (senderId: string, userId: string = 'currentUser'): ChatMessage[] => {
  const now = Date.now();
  return [
    {
      id: '1',
      senderId,
      text: 'Welcome! I\'m excited to host you at my property.',
      timestamp: new Date(now - 3600000 * 24), // 1 day ago
      status: 'read',
      type: 'text',
    },
    {
      id: '2',
      senderId: userId,
      text: 'Thank you! I have a question about parking.',
      timestamp: new Date(now - 3600000 * 23), // 23 hours ago
      status: 'read',
      type: 'text',
    },
    {
      id: '3',
      senderId,
      text: 'Yes, there\'s a dedicated parking spot for you.',
      timestamp: new Date(now - 3600000 * 22), // 22 hours ago
      status: 'read',
      type: 'text',
    },
    {
      id: '4',
      senderId,
      type: 'image',
      imageUrl: 'https://picsum.photos/400/300',
      text: 'Here\'s a photo of the parking area.',
      timestamp: new Date(now - 3600000 * 21), // 21 hours ago
      status: 'read',
    },
    {
      id: '5',
      senderId: userId,
      text: 'Perfect, thanks! And what time is check-in?',
      timestamp: new Date(now - 3600000 * 20), // 20 hours ago
      status: 'read',
      type: 'text',
    },
  ];
};

export const mockMessages: Message[] = [
  {
    id: '1',
    senderId: 'host1',
    senderName: 'Fahad Sultan',
    senderAvatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    listingId: 'listing1',
    listingTitle: 'Luxury Villa in Riyadh',
    preview: 'Thank you for your booking! Looking forward to hosting you.',
    timestamp: '5 min ago',
    read: false,
    lastMessageAt: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    messages: generateChatHistory('host1'),
  },
  {
    id: '2',
    senderId: 'host2',
    senderName: 'Sara Ahmed',
    senderAvatar: 'https://randomuser.me/api/portraits/women/62.jpg',
    listingId: 'listing2',
    listingTitle: 'Modern Apartment in Jeddah',
    preview: 'Your check-in instructions have been sent.',
    timestamp: '2 hours ago',
    read: true,
    lastMessageAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    messages: generateChatHistory('host2'),
  },
  {
    id: '3',
    senderId: 'host3',
    senderName: 'Mohammed Ali',
    senderAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    listingId: 'listing3',
    listingTitle: 'Beachfront Condo in Dammam',
    preview: 'Great! I will prepare everything for your arrival.',
    timestamp: '1 day ago',
    read: true,
    lastMessageAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    messages: generateChatHistory('host3'),
  },
  {
    id: '4',
    senderId: 'host4',
    senderName: 'Noura Khalid',
    senderAvatar: 'https://randomuser.me/api/portraits/women/45.jpg',
    listingId: 'listing4',
    listingTitle: 'Cozy Studio in Al Khobar',
    preview: 'How was your stay? Please leave a review!',
    timestamp: '3 days ago',
    read: false,
    lastMessageAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    messages: generateChatHistory('host4'),
  },
  {
    id: '5',
    senderId: 'host5',
    senderName: 'Abdullah Omar',
    senderAvatar: 'https://randomuser.me/api/portraits/men/92.jpg',
    listingId: 'listing5',
    listingTitle: 'Mountain View Villa in Abha',
    preview: 'Your reservation request has been approved!',
    timestamp: '1 week ago',
    read: true,
    lastMessageAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    messages: generateChatHistory('host5'),
  },
]; 