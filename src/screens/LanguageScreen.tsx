import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Text, I18nManager, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';
import { useTheme } from '../theme/ThemeContext';
import i18n from '../i18n/config';

type Language = 'en' | 'ar';

export const LanguageScreen = () => {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const setLanguage = async (lang: Language) => {
    try {
      setIsLoading(true);
      await AsyncStorage.setItem('lang', lang);
      i18n.changeLanguage(lang);
      
      if (lang === 'ar') {
        await I18nManager.forceRTL(true);
      } else {
        await I18nManager.forceRTL(false);
      }
      
      // Check if an update is available
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
        }
        await Updates.reloadAsync();
      } catch (updateError) {
        console.warn('Update failed, reloading app:', updateError);
        // If update fails, just reload the app
        await Updates.reloadAsync();
      }
    } catch (error) {
      console.error('Failed to set language:', error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loading, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.text, { color: colors.text, marginTop: 16 }]}>
          Changing language...
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Pressable
        style={[styles.option, { backgroundColor: colors.card }]}
        onPress={() => setLanguage('en')}
      >
        <Text style={[styles.text, { color: colors.text }]}>English</Text>
      </Pressable>
      <Pressable
        style={[styles.option, { backgroundColor: colors.card }]}
        onPress={() => setLanguage('ar')}
      >
        <Text style={[styles.text, { color: colors.text }]}>العربية</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
}); 