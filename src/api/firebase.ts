import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, where, orderBy, limit } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../services/firebase';

// Types
export interface Listing {
  id?: string;
  title: string;
  description: string;
  price: number;
  city: string;
  images: string[];
  ownerId: string;
  createdAt: Date;
}

export interface Service {
  id?: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
}

// Listings
export const getListings = async () => {
  const querySnapshot = await getDocs(collection(db, 'listings'));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Listing[];
};

export const getListing = async (id: string) => {
  const docRef = doc(db, 'listings', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Listing;
  }
  return null;
};

export const addListing = async (listing: Omit<Listing, 'id'>) => {
  const docRef = await addDoc(collection(db, 'listings'), listing);
  return { id: docRef.id, ...listing };
};

export const updateListing = async (id: string, data: Partial<Listing>) => {
  const docRef = doc(db, 'listings', id);
  await updateDoc(docRef, data);
  return { id, ...data };
};

export const deleteListing = async (id: string) => {
  await deleteDoc(doc(db, 'listings', id));
};

// Services
export const getServices = async () => {
  const querySnapshot = await getDocs(collection(db, 'services'));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Service[];
};

export const getService = async (id: string) => {
  const docRef = doc(db, 'services', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Service;
  }
  return null;
};

// Search
export const searchListings = async (city: string, minPrice?: number, maxPrice?: number) => {
  let q = query(collection(db, 'listings'), where('city', '==', city));
  
  if (minPrice !== undefined) {
    q = query(q, where('price', '>=', minPrice));
  }
  if (maxPrice !== undefined) {
    q = query(q, where('price', '<=', maxPrice));
  }

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Listing[];
};

// Image Upload
export const uploadListingImage = async (listingId: string, imageUri: string, index: number) => {
  const response = await fetch(imageUri);
  const blob = await response.blob();
  const storageRef = ref(storage, `listingImages/${listingId}/${index}.jpg`);
  await uploadBytes(storageRef, blob);
  return getDownloadURL(storageRef);
}; 