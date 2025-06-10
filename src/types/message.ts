export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'location';
  // Optional fields for different message types
  imageUrl?: string;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  listingId: string;
  listingTitle: string;
  preview: string;
  timestamp: string;
  read: boolean;
  lastMessageAt: Date; // For sorting
  messages: ChatMessage[]; // Chat history
} 