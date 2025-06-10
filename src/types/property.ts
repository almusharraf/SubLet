export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  city: string;
  neighborhood: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  latitude: number;
  longitude: number;
  images: string[];
  daysListed: number;
  has3DTour: boolean;
  
  // New filter-related fields
  rentalType: 'short' | 'mid' | 'long';
  isFurnished: boolean;
  isPetFriendly: boolean;
  amenities?: string[];
} 