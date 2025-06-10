export const spacing = {
  // Base spacing units
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
  
  // Screen padding
  screenPadding: 16,
  
  // Header height (including status bar)
  headerHeight: 44,
  
  // Bottom tab height
  tabHeight: 49,
  
  // Card spacing
  cardPadding: 16,
  cardMargin: 8,
  cardBorderRadius: 12,
  
  // Input spacing
  inputHeight: 48,
  inputPadding: 12,
  inputBorderRadius: 8,
  
  // Button spacing
  buttonHeight: 48,
  buttonPadding: 16,
  buttonBorderRadius: 8,
  
  // Modal spacing
  modalPadding: 24,
  modalBorderRadius: 16,
  
  // List spacing
  listItemPadding: 16,
  listItemSpacing: 8,
  
  // Image aspect ratios
  aspectRatio: {
    square: 1,
    portrait: 4 / 3,
    landscape: 16 / 9,
  },
  
  // Component specific
  tabBarHeight: 60,
  bottomSheetHandle: 24,
  cardRadius: 12,
  buttonPadding: 16,
  
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