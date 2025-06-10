import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
import 'dotenv/config';

const firebaseConfig = {
  // Your Firebase config object here - use environment variables in production
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const listings = [
  {
    title: "Modern Apartment in Riyadh",
    description: "Luxurious 2-bedroom apartment with stunning city views",
    price: 5000,
    city: "Riyadh",
    images: ["https://source.unsplash.com/random/800x600/?luxury,apartment"],
    ownerId: "seed-user-1",
    createdAt: Timestamp.now(),
    bedrooms: 2,
    bathrooms: 2,
    area: 120,
    amenities: ["Pool", "Gym", "Parking"]
  },
  {
    title: "Cozy Studio in Jeddah",
    description: "Perfect for singles or couples, near the Corniche",
    price: 3000,
    city: "Jeddah",
    images: ["https://source.unsplash.com/random/800x600/?studio,apartment"],
    ownerId: "seed-user-2",
    createdAt: Timestamp.now(),
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    amenities: ["Furnished", "Sea View"]
  },
  {
    title: "Villa in Dammam",
    description: "Spacious family villa with private garden",
    price: 8000,
    city: "Dammam",
    images: ["https://source.unsplash.com/random/800x600/?villa,house"],
    ownerId: "seed-user-1",
    createdAt: Timestamp.now(),
    bedrooms: 4,
    bathrooms: 3,
    area: 300,
    amenities: ["Garden", "Maid's Room", "Driver's Room"]
  }
];

const services = [
  {
    name: "Professional Photography",
    description: "High-quality property photography service",
    category: "Photography",
    price: 500,
    image: "https://source.unsplash.com/random/800x600/?camera,photographer",
    features: ["Professional Equipment", "Same-Day Delivery", "10 Edited Photos"],
    availability: ["Weekdays", "Weekends"],
    rating: 4.8
  },
  {
    name: "Home Cleaning",
    description: "Professional cleaning service for your property",
    category: "Cleaning",
    price: 200,
    image: "https://source.unsplash.com/random/800x600/?cleaning,housekeeping",
    features: ["Eco-friendly Products", "3-Hour Service", "Trained Staff"],
    availability: ["Daily"],
    rating: 4.6
  },
  {
    name: "Private Chef",
    description: "Experienced chef for private dining experiences",
    category: "Culinary",
    price: 800,
    image: "https://source.unsplash.com/random/800x600/?chef,cooking",
    features: ["Custom Menu", "Ingredients Included", "Special Dietary Options"],
    availability: ["Evenings", "Weekends"],
    rating: 4.9
  }
];

const users = [
  {
    id: "seed-user-1",
    name: "Ahmed",
    email: "ahmed@example.com",
    walletBalance: 10000,
    createdAt: Timestamp.now(),
    role: "owner"
  },
  {
    id: "seed-user-2",
    name: "Sara",
    email: "sara@example.com",
    walletBalance: 5000,
    createdAt: Timestamp.now(),
    role: "renter"
  }
];

async function seed() {
  try {
    // Seed users
    for (const user of users) {
      const { id, ...userData } = user;
      await addDoc(collection(db, 'users'), userData);
      console.log(`Added user: ${user.name}`);
    }

    // Seed listings
    for (const listing of listings) {
      await addDoc(collection(db, 'listings'), listing);
      console.log(`Added listing: ${listing.title}`);
    }

    // Seed services
    for (const service of services) {
      await addDoc(collection(db, 'services'), service);
      console.log(`Added service: ${service.name}`);
    }

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seed(); 