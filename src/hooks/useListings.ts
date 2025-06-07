import { useState, useEffect } from 'react';
import { Property } from '../types/property';

// Mock data as fallback
const mockListings: Property[] = [
  {
    id: '1',
    title: 'Luxury Apartment near Kingdom Centre',
    description: 'Modern 2BR apartment with stunning views of Kingdom Tower, fully furnished with high-end amenities',
    price: 9000,
    city: 'Riyadh',
    bedrooms: 2,
    bathrooms: 2,
    area: 120,
    latitude: 24.7111,
    longitude: 46.6745,
    images: [
      'https://source.unsplash.com/featured/?luxury,apartment,modern',
      'https://source.unsplash.com/featured/?apartment,kitchen',
      'https://source.unsplash.com/featured/?apartment,bedroom'
    ],
    daysListed: 2,
    has3DTour: true,
    neighborhood: 'Al Olaya'
  },
  {
    id: '2',
    title: 'Premium Studio in Al Malqa',
    description: 'Newly renovated studio apartment near Granada Mall, perfect for young professionals',
    price: 4500,
    city: 'Riyadh',
    bedrooms: 0,
    bathrooms: 1,
    area: 45,
    latitude: 24.7726,
    longitude: 46.6354,
    images: [
      'https://source.unsplash.com/featured/?studio,apartment,modern',
      'https://source.unsplash.com/featured/?studio,interior'
    ],
    daysListed: 5,
    has3DTour: true,
    neighborhood: 'Al Malqa'
  },
  {
    id: '3',
    title: 'Spacious Family Villa',
    description: 'Modern 4BR villa with private garden and swimming pool, perfect for families',
    price: 15000,
    city: 'Riyadh',
    bedrooms: 4,
    bathrooms: 3,
    area: 300,
    latitude: 24.7559,
    longitude: 46.6100,
    images: [
      'https://source.unsplash.com/featured/?villa,luxury,modern',
      'https://source.unsplash.com/featured/?villa,pool',
      'https://source.unsplash.com/featured/?villa,garden'
    ],
    daysListed: 1,
    has3DTour: true,
    neighborhood: 'Al Nakheel'
  },
  {
    id: '4',
    title: 'Modern Apartment with City Views',
    description: 'Brand new 3BR apartment with panoramic city views and smart home features',
    price: 11000,
    city: 'Riyadh',
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    latitude: 24.8231,
    longitude: 46.6366,
    images: [
      'https://source.unsplash.com/featured/?penthouse,modern',
      'https://source.unsplash.com/featured/?apartment,living',
      'https://source.unsplash.com/featured/?apartment,view'
    ],
    daysListed: 3,
    has3DTour: true,
    neighborhood: 'Al Yasmin'
  },
  {
    id: '5',
    title: 'Cozy 2BR near Panorama Mall',
    description: 'Well-maintained apartment with modern amenities and 24/7 security',
    price: 7500,
    city: 'Riyadh',
    bedrooms: 2,
    bathrooms: 2,
    area: 110,
    latitude: 24.7019,
    longitude: 46.6753,
    images: [
      'https://source.unsplash.com/featured/?apartment,cozy',
      'https://source.unsplash.com/featured/?apartment,modern,living'
    ],
    daysListed: 7,
    has3DTour: false,
    neighborhood: 'Al Wurud'
  },
  {
    id: '6',
    title: 'Executive Suite in King Abdullah District',
    description: 'High-end 1BR apartment with premium finishes and business center access',
    price: 8500,
    city: 'Riyadh',
    bedrooms: 1,
    bathrooms: 1,
    area: 85,
    latitude: 24.7297,
    longitude: 46.6700,
    images: [
      'https://source.unsplash.com/featured/?apartment,executive',
      'https://source.unsplash.com/featured/?apartment,business'
    ],
    daysListed: 4,
    has3DTour: true,
    neighborhood: 'King Abdullah District'
  },
  {
    id: '7',
    title: 'Furnished Studio in Al Ghadir',
    description: 'Fully furnished studio with modern appliances and gym access',
    price: 5000,
    city: 'Riyadh',
    bedrooms: 0,
    bathrooms: 1,
    area: 50,
    latitude: 24.7386,
    longitude: 46.6798,
    images: [
      'https://source.unsplash.com/featured/?studio,furnished',
      'https://source.unsplash.com/featured/?apartment,compact'
    ],
    daysListed: 6,
    has3DTour: false,
    neighborhood: 'Al Ghadir'
  }
];

export const useListings = () => {
  const [listings, setListings] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // TODO: Replace with actual Firebase fetch
        // For now, simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Use mock data for now
        setListings(mockListings);
        setError(null);
      } catch (err) {
        console.error('Error fetching listings:', err);
        setError('Failed to fetch listings');
        // Fallback to mock data on error
        setListings(mockListings);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  return { listings, loading, error };
}; 