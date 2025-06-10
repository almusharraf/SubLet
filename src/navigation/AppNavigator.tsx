// AppNavigator.tsx
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  LucideHome,
  LucideSearch,
  LucideHeart,
  LucideMessageSquare,
  LucideUser,
} from 'lucide-react-native';
import { useTheme } from '../theme/useTheme';
import { useAuth } from '../context/AuthContext';

// Screens
import { IntroScreen } from '../screens/IntroScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { SignupScreen } from '../screens/SignupScreen';
import { NafathScreen } from '../screens/NafathScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { WishlistScreen } from '../screens/WishlistScreen';
import { InboxScreen } from '../screens/InboxScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { PropertyDetailsScreen } from '../screens/PropertyDetailsScreen';
import { PropertyDetail } from '../screens/PropertyDetail';
import { BookingScreen } from '../screens/BookingScreen';
import { BookingConfirmationScreen } from '../screens/BookingConfirmationScreen';
import { WalletScreen } from '../screens/WalletScreen';
import { AddCardScreen } from '../screens/AddCardScreen';
import { HelpScreen } from '../screens/HelpScreen';
import { ServiceDetailsScreen } from '../screens/ServiceDetailsScreen';
import { MessageDetailsScreen } from '../screens/MessageDetailsScreen';
import { SearchMapScreen } from '../screens/SearchMapScreen';
import { FiltersScreen } from '../screens/FiltersScreen';
import { LanguageScreen } from '../screens/LanguageScreen';

// Types
import { RootStackParamList, MainTabParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Separate stack navigator for the Search tab
const SearchStack = createNativeStackNavigator();
function SearchStackScreen() {
  return (
    <SearchStack.Navigator screenOptions={{ headerShown: false }}>
      <SearchStack.Screen name="SearchHome" component={SearchScreen} />
      <SearchStack.Screen name="PropertyDetail" component={PropertyDetail} />
      <SearchStack.Screen name="SearchMap" component={SearchMapScreen} />
      <SearchStack.Screen 
        name="Filters" 
        component={FiltersScreen}
        options={{
          presentation: 'modal',
          headerShown: true,
          headerTitle: 'Filters',
        }}
      />
    </SearchStack.Navigator>
  );
}

function MainTabs() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <LucideHome size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStackScreen}
        options={{
          tabBarIcon: ({ color }) => <LucideSearch size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          tabBarIcon: ({ color }) => <LucideHeart size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={InboxScreen}
        options={{
          tabBarIcon: ({ color }) => <LucideMessageSquare size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <LucideUser size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

function LoadingScreen() {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}

export const AppNavigator = () => {
  const { colors } = useTheme();
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      {!user ? (
        // Auth Stack
        <>
          <Stack.Screen name="Intro" component={IntroScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Nafath" component={NafathScreen} />
        </>
      ) : (
        // Main App Stack
        <>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="PropertyDetails" component={PropertyDetailsScreen} />
          <Stack.Screen name="MessageDetails" component={MessageDetailsScreen} />
          <Stack.Screen name="Booking" component={BookingScreen} />
          <Stack.Screen name="BookingConfirmation" component={BookingConfirmationScreen} />
          <Stack.Screen name="Wallet" component={WalletScreen} />
          <Stack.Screen name="AddCard" component={AddCardScreen} />
          <Stack.Screen 
            name="Help" 
            component={HelpScreen}
            options={{ title: 'Help & Support', headerShown: true }}
          />
          <Stack.Screen
            name="ServiceDetails"
            component={ServiceDetailsScreen}
            options={({ route }) => ({
              title: route.params.service.name,
              headerBackTitle: 'Back',
              headerShown: true,
            })}
          />
          <Stack.Screen
            name="Language"
            component={LanguageScreen}
            options={{
              title: 'Language',
              headerShown: true,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
