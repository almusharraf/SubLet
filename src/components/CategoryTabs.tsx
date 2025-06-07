import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../theme/useTheme';
import { Text } from './Text';

type Tab = {
  id: string;
  label: string;
  showNew?: boolean;
};

const tabs: Tab[] = [
  { id: 'homes', label: 'Homes' },
  { id: 'experiences', label: 'Experiences', showNew: true },
  { id: 'services', label: 'Services', showNew: true },
];

interface BadgeProps {
  text: string;
}

const Badge: React.FC<BadgeProps> = ({ text }) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.badge, { backgroundColor: colors.primary }]}>
      <Text style={[styles.badgeText, { color: colors.buttonText }]}>{text}</Text>
    </View>
  );
};

interface CategoryTabsProps {
  onCategoryChange?: (category: string) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({ onCategoryChange }) => {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState('homes');

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
    onCategoryChange?.(tabId);
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
          style={({ pressed }) => [
            styles.tab,
            {
              borderBottomColor: activeTab === tab.id ? colors.primary : 'transparent',
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <View style={styles.tabContent}>
            <Text 
              style={[
                styles.tabText, 
                { 
                  color: activeTab === tab.id ? colors.primary : colors.text,
                  fontWeight: activeTab === tab.id ? '600' : '400',
                }
              ]}
            >
              {tab.label}
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 24,
  },
  tab: {
    paddingVertical: 8,
    borderBottomWidth: 2,
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tabText: {
    fontSize: 16,
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
}); 