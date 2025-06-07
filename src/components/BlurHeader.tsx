import React from 'react';
import { StyleSheet, View, Text, Animated, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import { spacing } from '../theme/spacing';
import { LucideChevronLeft, LucideHeart } from 'lucide-react-native';
import { typography } from '../theme/typography';

interface BlurHeaderProps {
  scrollY: Animated.Value;
  title?: string;
  onBack?: () => void;
  onSave?: () => void;
  saved?: boolean;
}

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
const AnimatedText = Animated.createAnimatedComponent(Text);

export const BlurHeader: React.FC<BlurHeaderProps> = ({
  scrollY,
  title,
  onBack,
  onSave,
  saved = false,
}) => {
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useTheme();
  
  const opacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const translateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [20, 0],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={[styles.container, { paddingTop: insets.top }]}>
      <AnimatedBlurView 
        intensity={isDark ? 40 : 60} 
        tint={isDark ? 'dark' : 'light'}
        style={[StyleSheet.absoluteFill, { opacity }]} 
      />
      <Animated.View style={[styles.content, { opacity }]}>
        {onBack && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <LucideChevronLeft size={24} color={colors.text} />
          </TouchableOpacity>
        )}
        {title && (
          <AnimatedText 
            style={[
              styles.title, 
              { 
                color: colors.text,
                opacity,
                transform: [{ translateY }],
              }
            ]} 
            numberOfLines={1}
          >
            {title}
          </AnimatedText>
        )}
        {onSave && (
          <TouchableOpacity
            style={styles.saveButton}
            onPress={onSave}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <LucideHeart
              size={24}
              color={saved ? colors.primary : colors.text}
              fill={saved ? colors.primary : 'none'}
            />
          </TouchableOpacity>
        )}
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  content: {
    height: spacing.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenPadding,
  },
  backButton: {
    padding: spacing.xs,
  },
  title: {
    ...typography.h4,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: spacing.md,
  },
  saveButton: {
    padding: spacing.xs,
  },
}); 