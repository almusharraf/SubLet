export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  city: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  latitude: number;
  longitude: number;
  images: string[];
  daysListed: number;
  has3DTour: boolean;
  neighborhood: string;
} 