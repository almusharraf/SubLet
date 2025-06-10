import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from './Text';
import { useTheme } from '../theme/useTheme';

type Category = 'homes' | 'services';

interface CategoryTabsProps {
  onCategoryChange: (category: Category) => void;
}

const CATEGORIES: Category[] = ['homes', 'services'];

export const CategoryTabs: React.FC<CategoryTabsProps> = ({ onCategoryChange }) => {
  const { colors } = useTheme();
  const [activeCategory, setActiveCategory] = React.useState<Category>('homes');

  const handlePress = (category: Category) => {
    setActiveCategory(category);
    onCategoryChange(category);
  };

  return (
    <View style={styles.container}>
      {CATEGORIES.map((category) => (
        <TouchableOpacity
          key={category}
          style={[
            styles.tab,
            { backgroundColor: colors.card },
            activeCategory === category && { backgroundColor: colors.primary },
          ]}
          onPress={() => handlePress(category)}
        >
          <Text
            style={[
              styles.text,
              { color: colors.text },
              activeCategory === category && { color: colors.buttonText },
            ]}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  tab: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
}); 