import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, DocumentData, Firestore, getFirestore } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { Service } from '../types/service';
import { services as mockServices } from '../data/services';

// Get typed Firestore instance
const firestore = getFirestore();

// Make validateService available for import
export const validateService = (service: any): service is Service => {
  return (
    service &&
    typeof service === 'object' &&
    typeof service.id === 'string' &&
    typeof service.name === 'string' &&
    typeof service.category === 'string' &&
    typeof service.description === 'string' &&
    typeof service.price === 'number' &&
    typeof service.currency === 'string' &&
    typeof service.rating === 'number' &&
    typeof service.reviews === 'number' &&
    typeof service.imageUrl === 'string' &&
    service.provider &&
    typeof service.provider === 'object' &&
    typeof service.provider.id === 'string' &&
    typeof service.provider.name === 'string' &&
    typeof service.provider.avatar === 'string' &&
    typeof service.provider.rating === 'number' &&
    typeof service.provider.totalJobs === 'number'
  );
};

export function useServices() {
  // Initialize with validated mock services
  const validMockServices = mockServices.filter(validateService);
  const [services, setServices] = useState<Service[]>(validMockServices);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!firestore) {
      console.warn('[useServices] Firestore not initialized, using mock data');
      setServices(validMockServices);
      setLoading(false);
      return;
    }

    setLoading(true);
    
    try {
      // Create a query for the services collection
      const q = query(collection(firestore, 'services'));

      // Set up real-time listener
      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (snapshot.empty) {
          console.log('[useServices] No Firestore data, using mock data');
          setServices(validMockServices);
          setLoading(false);
          return;
        }

        const servicesData = snapshot.docs
          .map(doc => {
            const data = doc.data();
            const service = {
              id: doc.id,
              name: data.name,
              description: data.description,
              category: data.category,
              price: Number(data.price),
              currency: data.currency,
              rating: Number(data.rating),
              reviews: Number(data.reviews),
              imageUrl: data.imageUrl,
              provider: {
                id: data.provider?.id,
                name: data.provider?.name,
                avatar: data.provider?.avatar,
                rating: Number(data.provider?.rating),
                totalJobs: Number(data.provider?.totalJobs),
              }
            };
            return service;
          })
          .filter(validateService);

        if (servicesData.length > 0) {
          setServices(servicesData);
        } else {
          console.log('[useServices] No valid Firestore services, using mock data');
          setServices(validMockServices);
        }
        setLoading(false);
      }, (err) => {
        console.warn('[useServices] Firestore error, using mock data:', err);
        setError(err);
        setServices(validMockServices);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      console.warn('[useServices] Failed to initialize Firestore, using mock data:', err);
      setError(err as Error);
      setServices(validMockServices);
      setLoading(false);
    }
  }, []);

  return { 
    services,
    loading,
    error
  };
} 