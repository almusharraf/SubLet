export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  images: string[];
  location: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
} 