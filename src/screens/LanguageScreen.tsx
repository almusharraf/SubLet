import React from 'react';
import { View, StyleSheet, Pressable, Text, I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';
import { useTheme } from '../theme/ThemeContext';
import i18n from '../i18n/config';

type Language = 'en' | 'ar';

export const LanguageScreen = () => {
  const { colors } = useTheme();

  const setLanguage = async (lang: Language) => {
    try {
      await AsyncStorage.setItem('lang', lang);
      i18n.changeLanguage(lang);
      
      if (lang === 'ar') {
        await I18nManager.forceRTL(true);
      } else {
        await I18nManager.forceRTL(false);
      }
      
      await Updates.reloadAsync();
    } catch (error) {
      console.error('Failed to set language:', error);
    }
  };

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