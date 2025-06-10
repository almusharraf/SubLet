export type ServiceCategory = 'photography' | 'culinary' | 'cleaning' | 'maintenance' | 'tutoring' | 'default';

export interface ServiceProvider {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  totalJobs: number;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  currency: string;
  rating: number;
  reviews: number;
  imageUrl: string;
  provider: ServiceProvider;
} 