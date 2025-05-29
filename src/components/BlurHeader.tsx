import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

interface BlurHeaderProps {
  scrollY: Animated.SharedValue<number>;
  title?: string;
  LeftComponent?: React.ReactNode;
  RightComponent?: React.ReactNode;
}

const AnimatedText = Animated.createAnimatedComponent(Text);

export const BlurHeader: React.FC<BlurHeaderProps> = ({
  scrollY,
  title,
  LeftComponent,
  RightComponent,
}) => {
  const insets = useSafeAreaInsets();
  
  const headerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 100],
      [0, 1],
      'clamp'
    );
    
    return {
      opacity,
    };
  });
  
  const titleStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 100],
      [0, 1],
      'clamp'
    );
    
    const translateY = interpolate(
      scrollY.value,
      [0, 100],
      [20, 0],
      'clamp'
    );
    
    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  return (
    <Animated.View style={[styles.container, { paddingTop: insets.top }]}>
      <BlurView intensity={80} style={StyleSheet.absoluteFill} />
      <Animated.View style={[styles.content, headerStyle]}>
        <View style={styles.left}>
          {LeftComponent}
        </View>
        {title && (
          <AnimatedText style={[styles.title, titleStyle]} numberOfLines={1}>
            {title}
          </AnimatedText>
        )}
        <View style={styles.right}>
          {RightComponent}
        </View>
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
  left: {
    width: 40,
    alignItems: 'flex-start',
  },
  right: {
    width: 40,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
    lineHeight: typography.lineHeights.normal * typography.sizes.xl,
    color: colors.text,
    textAlign: 'center',
    flex: 1,
  },
}); 