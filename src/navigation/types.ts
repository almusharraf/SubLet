import { NavigatorScreenParams } from '@react-navigation/native';

export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
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
  PropertyDetails: {
    propertyId: string;
    title: string;
    description: string;
    price: number;
    city: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    imageUrl: string;
  };
  ServiceDetails: {
    service: {
      id: string;
      name: string;
      category: string;
      rating: number;
      price: number;
      imageUrl: string;
      description?: string;
    };
  };
  Booking: {
    propertyId: string;
    startDate: string;
    endDate: string;
  };
  Wallet: undefined;
  AddCard: undefined;
  Help: undefined;
};

export type SearchStackParamList = {
  SearchHome: undefined;
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