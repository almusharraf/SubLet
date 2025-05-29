import type { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Wishlist: undefined;
  Inbox: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  TabNavigator: NavigatorScreenParams<TabParamList>;
};
