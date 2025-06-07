
import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { FirestoreListing } from '../config/firebase';

export function useListings() {
  const [listings, setListings] = useState<FirestoreListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    
    try {
      // Create a query for the listings collection
      const q = query(collection(db, 'listings'));

      // Set up real-time listener
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const listingsData: FirestoreListing[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as DocumentData;
          listingsData.push({
            id: doc.id,
            title: data.title,
            description: data.description,
            price: data.price,
            city: data.city,
            bedrooms: data.bedrooms,
            bathrooms: data.bathrooms,
            area: data.area,
            status: data.status,
            ownerId: data.ownerId,
            imageUrl: data.imageUrl,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
          });
        });
        setListings(listingsData);
        setLoading(false);
      }, (err) => {
        setError(err);
        setLoading(false);
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  }, []);

  return { listings, loading, error };
} 