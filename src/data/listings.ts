import type { Property } from '../types/property';

// High-quality curated Unsplash images for listings
const LISTING_IMAGES = {
  luxury: [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600573472550-8090733b329d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80'
  ],
  studio: [
    'https://images.unsplash.com/photo-1572120360610-d971b9b1e773?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80'
  ],
  villa: [
    'https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
  ]
};

export const mockListings: Property[] = [
  {
    id: '1',
    title: 'Luxury Apartment near Kingdom Centre',
    description: 'Modern 2BR apartment with stunning views of Kingdom Tower, fully furnished with high-end amenities',
    price: 9000,
    city: 'Riyadh',
    neighborhood: 'Al Olaya',
    bedrooms: 2,
    bathrooms: 2,
    area: 120,
    latitude: 24.7111,
    longitude: 46.6745,
    images: LISTING_IMAGES.luxury,
    daysListed: 2,
    has3DTour: true,
    rentalType: 'short',
    isFurnished: true,
    isPetFriendly: false,
    amenities: ['WiFi', 'Gym', 'Parking']
  },
  {
    id: '2',
    title: 'Premium Studio in Al Malqa',
    description: 'Newly renovated studio apartment near Granada Mall, perfect for young professionals',
    price: 4500,
    city: 'Riyadh',
    neighborhood: 'Al Malqa',
    bedrooms: 0,
    bathrooms: 1,
    area: 45,
    latitude: 24.7726,
    longitude: 46.6354,
    images: LISTING_IMAGES.studio,
    daysListed: 5,
    has3DTour: true,
    rentalType: 'mid',
    isFurnished: true,
    isPetFriendly: true,
    amenities: ['WiFi', 'Kitchen', 'Balcony']
  },
  {
    id: '3',
    title: 'Spacious Family Villa',
    description: 'Modern 4BR villa with private garden and swimming pool, perfect for families',
    price: 15000,
    city: 'Riyadh',
    neighborhood: 'Al Nakheel',
    bedrooms: 4,
    bathrooms: 3,
    area: 300,
    latitude: 24.7559,
    longitude: 46.6100,
    images: LISTING_IMAGES.villa,
    daysListed: 1,
    has3DTour: true,
    rentalType: 'long',
    isFurnished: true,
    isPetFriendly: true,
    amenities: ['Pool', 'Garden', 'Parking', 'Security']
  },
  {
    id: '4',
    title: 'Modern 1BR in Al Yasmin',
    description: 'Stylish 1-bedroom apartment with modern amenities and great location',
    price: 6000,
    city: 'Riyadh',
    neighborhood: 'Al Yasmin',
    bedrooms: 1,
    bathrooms: 1,
    area: 75,
    latitude: 24.8231,
    longitude: 46.6367,
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80'
    ],
    daysListed: 3,
    has3DTour: false,
    rentalType: 'short',
    isFurnished: false,
    isPetFriendly: false,
    amenities: ['WiFi']
  },
  {
    id: '5',
    title: 'Furnished Studio in Al Ghadir',
    description: 'Fully furnished studio with modern appliances and gym access',
    price: 5000,
    city: 'Riyadh',
    neighborhood: 'Al Ghadir',
    bedrooms: 0,
    bathrooms: 1,
    area: 50,
    latitude: 24.7386,
    longitude: 46.6798,
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598928636598-26c2a617c04e?auto=format&fit=crop&w=800&q=80'
    ],
    daysListed: 6,
    has3DTour: false,
    rentalType: 'mid',
    isFurnished: true,
    isPetFriendly: true,
    amenities: ['Gym', 'WiFi', 'Kitchen']
  },
]; 