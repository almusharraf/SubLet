import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
export const CARD_WIDTH = width - 32; // 16px padding on each side
export const CARD_ASPECT_RATIO = 4 / 3;
export const IMAGE_HEIGHT = CARD_WIDTH / CARD_ASPECT_RATIO;

// Map of service categories to their fallback images
const SERVICE_FALLBACK_IMAGES: Record<string, string> = {
  photography: 'https://source.unsplash.com/featured/?photography,camera',
  culinary: 'https://source.unsplash.com/featured/?chef,cooking',
  cleaning: 'https://source.unsplash.com/featured/?cleaning,housekeeping',
  maintenance: 'https://source.unsplash.com/featured/?maintenance,repair',
  tutoring: 'https://source.unsplash.com/featured/?education,study',
  default: 'https://source.unsplash.com/featured/?service,professional'
};

// Default image for real estate listings
const LISTING_FALLBACK_IMAGE = 'https://source.unsplash.com/featured/?apartment,modern';

export function getServiceImage(imageUrl: string | undefined | null, category: string): string {
  if (isValidImageUrl(imageUrl)) {
    return imageUrl!;
  }
  
  const fallbackUrl = SERVICE_FALLBACK_IMAGES[category.toLowerCase()] || SERVICE_FALLBACK_IMAGES.default;
  return `${fallbackUrl}&t=${Date.now()}`; // Add timestamp to prevent caching
}

export function getListingImage(imageUrl: string | undefined | null): string {
  if (isValidImageUrl(imageUrl)) {
    return imageUrl!;
  }
  
  return `${LISTING_FALLBACK_IMAGE}&t=${Date.now()}`; // Add timestamp to prevent caching
}

// Validate if an image URL is potentially valid
export function isValidImageUrl(url: string | undefined | null): boolean {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return false;
  }

  try {
    const parsedUrl = new URL(url);
    return ['http:', 'https:'].includes(parsedUrl.protocol);
  } catch {
    return false;
  }
}

// Get multiple images for a listing with fallbacks
export function getListingImages(images: string[] | undefined | null): string[] {
  if (!Array.isArray(images) || images.length === 0) {
    return [getListingImage(null)];
  }

  return images.map(img => isValidImageUrl(img) ? img : getListingImage(null));
} 