import React from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import type { RootStackNavigationProp } from '../navigation/types';

type Tab = {
  id: 'homes' | 'experiences' | 'services';
  label: string;
  showNew?: boolean;
};

interface Props {
  activeTab: Tab['id'];
  onTabPress: (tabId: Tab['id']) => void;
}

const tabs: Tab[] = [
  { id: 'homes', label: 'Homes' },
  { id: 'experiences', label: 'Experiences', showNew: true },
  { id: 'services', label: 'Services', showNew: true },
];

const Badge = ({ text }: { text: string }) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.badge, { backgroundColor: colors.primary }]}>
      <Text style={[styles.badgeText, { color: colors.surface }]}>{text}</Text>
    </View>
  );
};

export const CategoryTabs = ({ activeTab, onTabPress }: Props) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<RootStackNavigationProp>();

  const handleTabPress = (id: Tab['id']) => {
    onTabPress(id);
    if (id !== 'homes') {
      navigation.navigate(id === 'services' ? 'ServicesScreen' : 'ExperiencesScreen');
    }
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {tabs.map((tab) => (
        <Pressable
          key={tab.id}
          onPress={() => handleTabPress(tab.id)}
          style={[
            styles.tab,
            activeTab === tab.id && { borderBottomColor: colors.primary },
          ]}
        >
          <View style={styles.tabContent}>
            <Text style={[styles.tabText, { color: colors.text }]}>
              {t(`tabs.${tab.label.toLowerCase()}`, tab.label)}
            </Text>
            {tab.showNew && <Badge text="NEW" />}
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    gap: 24,
  },
  tab: {
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
  badge: {
    height: 16,
    paddingHorizontal: 4,
    borderRadius: 8,
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 8,
    fontWeight: '600',
  },
}); 