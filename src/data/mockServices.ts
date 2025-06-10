import { Service } from '../types/service';

export const mockServices: Service[] = [
  {
    id: '1',
    name: 'Professional Photography',
    category: 'Photography',
    description: 'Professional photography services for your property listings',
    price: 500,
    currency: 'SAR',
    rating: 4.8,
    reviews: 124,
    imageUrl: 'https://source.unsplash.com/800x600/?photography,property',
    provider: {
      id: 'provider1',
      name: 'Ahmed Photography',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 4.8,
      totalJobs: 256,
    }
  },
  {
    id: '2',
    name: 'Home Cleaning',
    category: 'Cleaning',
    description: 'Professional home cleaning services',
    price: 300,
    currency: 'SAR',
    rating: 4.7,
    reviews: 89,
    imageUrl: 'https://source.unsplash.com/800x600/?cleaning,home',
    provider: {
      id: 'provider2',
      name: 'CleanPro Services',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
      rating: 4.7,
      totalJobs: 178,
    }
  },
  {
    id: '3',
    name: 'Maintenance & Repairs',
    category: 'Maintenance',
    description: 'General maintenance and repair services',
    price: 400,
    currency: 'SAR',
    rating: 4.6,
    reviews: 312,
    imageUrl: 'https://source.unsplash.com/800x600/?maintenance,tools',
    provider: {
      id: 'provider3',
      name: 'FixIt Pro',
      avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
      rating: 4.6,
      totalJobs: 567,
    }
  },
  {
    id: '4',
    name: 'Interior Design',
    category: 'Design',
    description: 'Professional interior design consultation',
    price: 800,
    currency: 'SAR',
    rating: 4.9,
    reviews: 78,
    imageUrl: 'https://source.unsplash.com/800x600/?interior,design',
    provider: {
      id: 'provider4',
      name: 'Noura Designs',
      avatar: 'https://randomuser.me/api/portraits/women/62.jpg',
      rating: 4.9,
      totalJobs: 145,
    }
  }
]; 