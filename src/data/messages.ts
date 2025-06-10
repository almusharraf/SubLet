export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participants: {
    id: string;
    name: string;
    avatar: string;
  }[];
  lastMessage: Message;
  unreadCount: number;
}

export const conversations: Conversation[] = [
  {
    id: 'c1',
    participants: [
      {
        id: 'h1',
        name: 'Mohammed',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      }
    ],
    lastMessage: {
      id: 'm1',
      senderId: 'h1',
      receiverId: 'user',
      text: 'Looking forward to hosting you! Let me know if you need anything.',
      timestamp: '2024-03-15T10:30:00Z',
      isRead: false,
    },
    unreadCount: 2,
  },
  {
    id: 'c2',
    participants: [
      {
        id: 'h2',
        name: 'Sara',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      }
    ],
    lastMessage: {
      id: 'm2',
      senderId: 'user',
      receiverId: 'h2',
      text: 'Thanks for the great stay! I\'ll definitely come back.',
      timestamp: '2024-03-14T15:45:00Z',
      isRead: true,
    },
    unreadCount: 0,
  },
  {
    id: 'c3',
    participants: [
      {
        id: 'h3',
        name: 'Ahmed',
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      }
    ],
    lastMessage: {
      id: 'm3',
      senderId: 'h3',
      receiverId: 'user',
      text: 'Your booking request has been confirmed!',
      timestamp: '2024-03-13T09:15:00Z',
      isRead: true,
    },
    unreadCount: 0,
  },
]; 