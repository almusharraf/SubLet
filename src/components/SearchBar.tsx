import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  ViewStyle,
  TextStyle,
  FlatList,
  Text,
} from 'react-native';
import { Search, Sliders, Clock } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onFilterPress?: () => void;
  placeholder?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onFilterPress,
  placeholder = 'Search destinations',
  containerStyle,
  inputStyle,
}) => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleSearch = (text: string) => {
    onChangeText(text);
    if (text.trim() && !searchHistory.includes(text)) {
      setSearchHistory(prev => [text, ...prev].slice(0, 5));
    }
  };

  const handleHistoryItemPress = (item: string) => {
    onChangeText(item);
    setShowHistory(false);
  };

  return (
    <View style={[styles.wrapper, containerStyle]}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Search size={20} color={colors.gray} style={styles.searchIcon} />
          <TextInput
            value={value}
            onChangeText={handleSearch}
            placeholder={placeholder}
            placeholderTextColor={colors.gray}
            style={[styles.input, inputStyle]}
            onFocus={() => setShowHistory(true)}
          />
        </View>
        {onFilterPress && (
          <Pressable
            style={styles.filterButton}
            onPress={onFilterPress}
            hitSlop={8}
          >
            <Sliders size={20} color={colors.black} />
          </Pressable>
        )}
      </View>

      {showHistory && searchHistory.length > 0 && (
        <View style={styles.historyContainer}>
          <FlatList
            data={searchHistory}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Pressable
                style={styles.historyItem}
                onPress={() => handleHistoryItemPress(item)}
              >
                <Clock size={16} color={colors.gray} />
                <Text style={styles.historyText}>{item}</Text>
              </Pressable>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    zIndex: 1,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  input: {
    ...typography.body,
    flex: 1,
    height: 40,
    padding: 0,
  },
  filterButton: {
    marginLeft: spacing.md,
    padding: spacing.xs,
  },
  historyContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderRadius: 12,
    marginTop: spacing.xs,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    borderRadius: 8,
  },
  historyText: {
    ...typography.body,
    marginLeft: spacing.sm,
  },
}); 