import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Constants for card dimensions
export const CARD_WIDTH = width - 32; // 16px padding on each side
export const IMAGE_HEIGHT = width * 0.75;

// High-quality curated Unsplash images
const STATIC_FALLBACK_IMAGES = {
  property: [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1572120360610-d971b9b1e773?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80'
  ],
  service: {
    photography: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    culinary: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80',
    cleaning: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80',
    maintenance: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    tutoring: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    default: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80'
  }
};

// Dynamic Unsplash queries for different cities
const CITY_KEYWORDS = {
  'Riyadh': 'modern,building,saudi',
  'Jeddah': 'coastal,building,saudi',
  'Dammam': 'gulf,building,saudi',
  'default': 'apartment,modern'
};

// Validate image URL
export function isValidImageUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Add cache busting parameter to prevent stale images
function addCacheBuster(url: string): string {
  return `${url}${url.includes('?') ? '&' : '?'}t=${Date.now()}`;
}

// Get dynamic Unsplash image based on city
function getDynamicCityImage(city: string): string {
  const keywords = CITY_KEYWORDS[city as keyof typeof CITY_KEYWORDS] || CITY_KEYWORDS.default;
  return `https://source.unsplash.com/featured/?${keywords}`;
}

// Get a single property image with fallback
export function getPropertyImage(
  imageUrl: string | null | undefined,
  city?: string,
  index: number = 0
): string {
  if (isValidImageUrl(imageUrl)) {
    return imageUrl!;
  }
  
  // Use static fallback if available
  if (index < STATIC_FALLBACK_IMAGES.property.length) {
    return STATIC_FALLBACK_IMAGES.property[index];
  }
  
  // Fallback to dynamic city-based image
  return addCacheBuster(city ? getDynamicCityImage(city) : getDynamicCityImage('default'));
}

// Get multiple property images with fallbacks
export function getPropertyImages(
  images: string[] | null | undefined,
  city?: string
): string[] {
  if (!Array.isArray(images) || images.length === 0) {
    // Return at least 3 images
    return [
      getPropertyImage(null, city, 0),
      getPropertyImage(null, city, 1),
      getPropertyImage(null, city, 2)
    ];
  }
  
  return images.map((img, index) => 
    isValidImageUrl(img) ? img : getPropertyImage(null, city, index)
  );
}

// Get service image with fallback
export function getServiceImage(
  imageUrl: string | null | undefined,
  category: keyof typeof STATIC_FALLBACK_IMAGES.service = 'default'
): string {
  if (isValidImageUrl(imageUrl)) {
    return imageUrl!;
  }
  return STATIC_FALLBACK_IMAGES.service[category] || STATIC_FALLBACK_IMAGES.service.default;
}

// Get multiple service images with fallbacks
export function getServiceImages(
  images: string[] | null | undefined,
  category: keyof typeof STATIC_FALLBACK_IMAGES.service = 'default'
): string[] {
  if (!Array.isArray(images) || images.length === 0) {
    return [getServiceImage(null, category)];
  }
  return images.map(img => isValidImageUrl(img) ? img : getServiceImage(null, category));
}

// Determine property type from title/description for better fallback images
export function getPropertyType(title: string, description: string): 'modern' | 'luxury' | 'villa' | 'studio' | 'default' {
  const text = `${title} ${description}`.toLowerCase();
  if (text.includes('luxury') || text.includes('premium')) return 'luxury';
  if (text.includes('villa') || text.includes('house')) return 'villa';
  if (text.includes('studio')) return 'studio';
  if (text.includes('modern') || text.includes('new')) return 'modern';
  return 'default';
} 