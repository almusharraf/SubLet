import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// @ts-ignore
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin if not already initialized
if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount)
  });
}

export const db = getFirestore();

// Export types for shared use
export interface FirestoreUser {
  id: string;
  name: string;
  email: string;
  walletBalance: number;
  role: 'owner' | 'renter';
  status: 'active' | 'inactive';
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

export interface FirestoreListing {
  id: string;
  title: string;
  description: string;
  price: number;
  city: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  status: 'available' | 'rented' | 'pending';
  ownerId: string;
  imageUrl: string;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

export interface FirestoreService {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  imageUrl: string;
  status: 'active' | 'inactive';
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
} 