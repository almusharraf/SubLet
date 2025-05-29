export interface Property {
  id: string;
  title: string;
  titleAr?: string;
  description: string;
  descriptionAr?: string;
  price: number;
  location: string;
  locationAr?: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  images: string[];
  rating: number;
  reviews: number;
  host: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
  };
  amenities: string[];
  type: 'Entire place' | 'Private room' | 'Shared room';
  beds: number;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  instantBook: boolean;
  category: string;
  isSaved?: boolean;
}

export const properties: Property[] = [
  {
    id: '1',
    title: 'Luxury Apartment with Sea View',
    titleAr: 'شقة فاخرة في برج المملكة',
    description: 'Modern luxury apartment with stunning sea views in Jeddah Corniche',
    descriptionAr: 'استمتع بالحياة الفاخرة في قلب الرياض مع إطلالات خلابة على المدينة من هذه الشقة الحديثة في برج المملكة الشهير.',
    price: 450,
    location: 'Jeddah, Saudi Arabia',
    locationAr: 'جدة، المملكة العربية السعودية',
    coordinates: {
      latitude: 43.1729,
      longitude: 6.5256,
    },
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
    ],
    rating: 4.92,
    reviews: 128,
    host: {
      id: 'h1',
      name: 'Mohammed',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      rating: 4.8,
    },
    amenities: ['Pool', 'Gym', 'WiFi', 'Kitchen', 'Free parking'],
    type: 'Entire place',
    beds: 3,
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    instantBook: true,
    category: 'apartment',
  },
  {
    id: '2',
    title: 'Modern Villa in Riyadh',
    titleAr: 'فيلا عصرية في البلدة القديمة بالعلا',
    description: 'Spacious villa with private pool in diplomatic quarter',
    descriptionAr: 'أقم في منزل تقليدي تم ترميمه بشكل جميل في قلب البلدة القديمة بالعلا، يجمع بين العمارة الأصيلة والراحة العصرية.',
    price: 850,
    location: 'Riyadh, Saudi Arabia',
    locationAr: 'الرياض، المملكة العربية السعودية',
    coordinates: {
      latitude: 43.1829,
      longitude: 6.5356,
    },
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811',
    ],
    rating: 4.88,
    reviews: 95,
    host: {
      id: 'h2',
      name: 'Sara',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      rating: 4.9,
    },
    amenities: ['Pool', 'Garden', 'BBQ', 'WiFi', 'Kitchen'],
    type: 'Entire place',
    beds: 5,
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    instantBook: false,
    category: 'villa',
  },
  {
    id: '3',
    title: 'Desert Retreat in AlUla',
    titleAr: 'شاليه على شاطئ جدة',
    description: 'Unique desert experience with modern amenities',
    descriptionAr: 'اهرب إلى هذا الشاليه المذهل على الشاطئ مع إمكانية الوصول إلى الشاطئ الخاص وإطلالات بانورامية على البحر الأحمر. مثالي للعائلات ومحبي الشاطئ.',
    price: 380,
    location: 'AlUla, Saudi Arabia',
    locationAr: 'ألولا، المملكة العربية السعودية',
    coordinates: {
      latitude: 43.1629,
      longitude: 6.5156,
    },
    images: [
      'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5',
      'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5',
    ],
    rating: 4.95,
    reviews: 74,
    host: {
      id: 'h3',
      name: 'Ahmed',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      rating: 4.7,
    },
    amenities: ['Desert view', 'Breakfast', 'Tours', 'WiFi'],
    type: 'Private room',
    beds: 2,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    instantBook: true,
    category: 'unique',
  }
];
