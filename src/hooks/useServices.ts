import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { FirestoreService } from '../config/firebase';

export function useServices() {
  const [services, setServices] = useState<FirestoreService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    
    try {
      // Create a query for the services collection
      const q = query(collection(db, 'services'));

      // Set up real-time listener
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const servicesData: FirestoreService[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as DocumentData;
          servicesData.push({
            id: doc.id,
            name: data.name,
            description: data.description,
            category: data.category,
            price: data.price,
            rating: data.rating,
            imageUrl: data.imageUrl,
            status: data.status,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
          });
        });
        setServices(servicesData);
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

  return { services, loading, error };
} 