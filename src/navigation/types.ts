import { NavigatorScreenParams } from '@react-navigation/native';
import { Property } from '../types/property';
import { Service } from '../types/service';
import { Message } from '../types/message';

export type SearchStackParamList = {
  SearchHome: undefined;
  PropertyDetail: { property: Property };
  SearchMap: undefined;
  Filters: {
    applyFilters?: (filters: any) => void;
    initialFilters?: any;
  };
};

export type MainTabParamList = {
  Home: undefined;
  Search: NavigatorScreenParams<SearchStackParamList>;
  Wishlist: undefined;
  Inbox: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  // Auth Stack
  Intro: undefined;
  Login: undefined;
  Signup: undefined;
  Nafath: undefined;

  // Main App Stack
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  PropertyDetails: { propertyId: string };
  ServiceDetails: { service: Pick<Service, 'name' | 'imageUrl' | 'category'> };
  MessageDetails: { messageId: string };
  Booking: { 
    propertyId: string;
    title: string;
    price: number;
    imageUrl: string;
    location: string;
    dates?: {
      checkIn: Date | null;
      checkOut: Date | null;
    };
  };
  BookingConfirmation: {
    bookingId: string;
    propertyId: string;
  };
  Wallet: undefined;
  AddCard: undefined;
  Help: undefined;
  Language: undefined;
};

export type WishlistStackParamList = {
  WishlistHome: undefined;
};

export type InboxStackParamList = {
  InboxHome: undefined;
};

export type ProfileStackParamList = {
  ProfileHome: undefined;
}; 