import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { config } from 'dotenv';
import path from 'path';

// Load environment variables
config();

// Initialize Firebase Admin
const app = initializeApp({
  credential: cert(path.join(__dirname, '../config/serviceAccountKey.json'))
});

const db = getFirestore(app);

const listings = [
  {
    title: "Modern Apartment in Riyadh",
    description: "Luxurious 2-bedroom apartment with stunning city views",
    price: 5000,
    city: "Riyadh",
    imageUrl: "https://source.unsplash.com/random/800x600/?luxury,apartment",
    ownerId: "seed-user-1",
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    bedrooms: 2,
    bathrooms: 2,
    area: 120,
    status: 'available'
  },
  {
    title: "Cozy Studio in Jeddah",
    description: "Perfect for singles or couples, near the Corniche",
    price: 3000,
    city: "Jeddah",
    imageUrl: "https://source.unsplash.com/random/800x600/?studio,apartment",
    ownerId: "seed-user-2",
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    status: 'available'
  },
  {
    title: "Villa in Dammam",
    description: "Spacious family villa with private garden",
    price: 8000,
    city: "Dammam",
    imageUrl: "https://source.unsplash.com/random/800x600/?villa,house",
    ownerId: "seed-user-1",
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    bedrooms: 4,
    bathrooms: 3,
    area: 300,
    status: 'available'
  }
];

const services = [
  {
    name: "Professional Photography",
    description: "High-quality property photography service",
    category: "Photography",
    price: 500,
    imageUrl: "https://source.unsplash.com/random/800x600/?camera,photographer",
    status: 'active',
    rating: 4.8,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  },
  {
    name: "Home Cleaning",
    description: "Professional cleaning service for your property",
    category: "Cleaning",
    price: 200,
    imageUrl: "https://source.unsplash.com/random/800x600/?cleaning,housekeeping",
    status: 'active',
    rating: 4.6,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  },
  {
    name: "Private Chef",
    description: "Experienced chef for private dining experiences",
    category: "Culinary",
    price: 800,
    imageUrl: "https://source.unsplash.com/random/800x600/?chef,cooking",
    status: 'active',
    rating: 4.9,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  }
];

const users = [
  {
    id: "seed-user-1",
    name: "Ahmed",
    email: "ahmed@example.com",
    walletBalance: 10000,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    role: "owner",
    status: "active"
  },
  {
    id: "seed-user-2",
    name: "Sara",
    email: "sara@example.com",
    walletBalance: 5000,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    role: "renter",
    status: "active"
  }
];

async function seed() {
  try {
    // Seed users
    for (const user of users) {
      const { id, ...userData } = user;
      await db.collection('users').doc(id).set(userData);
      console.log(`Added user: ${user.name}`);
    }

    // Seed listings
    for (const listing of listings) {
      const docRef = await db.collection('listings').add(listing);
      await db.collection('listings').doc(docRef.id).update({ id: docRef.id });
      console.log(`Added listing: ${listing.title}`);
    }

    // Seed services
    for (const service of services) {
      const docRef = await db.collection('services').add(service);
      await db.collection('services').doc(docRef.id).update({ id: docRef.id });
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