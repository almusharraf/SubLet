export const spacing = {
  // Base spacing units
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  
  // Screen padding
  screenPadding: 16,
  
  // Component specific
  headerHeight: 60,
  tabBarHeight: 60,
  bottomSheetHandle: 24,
  cardPadding: 16,
  cardRadius: 12,
  buttonHeight: 48,
  inputHeight: 48,
  
  // Layout
  gutter: 16,
  listItemHeight: 64,
  
  // Margins and paddings
  margin: {
    horizontal: 16,
    vertical: 20,
  },
  padding: {
    horizontal: 16,
    vertical: 20,
  },
  
  // Safe area
  safeArea: {
    top: 44,
    bottom: 34,
  },
  
  // Specific use cases
  sectionSpacing: 24,
  itemSpacing: 16,
  inputPadding: 12,
  buttonPadding: 16,
} as const;

export type SpacingType = keyof typeof spacing;

export type ThemeSpacing = typeof spacing; 