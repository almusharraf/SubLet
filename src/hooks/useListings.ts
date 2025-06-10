import { useState, useEffect } from 'react';
import { Property } from '../types/property';
import { mockListings } from '../data/listings';

/**
 * Custom Hook: useListings
 * 
 * This hook manages the state and data fetching for property listings.
 * Currently using mock data, but designed to be easily switched to Firebase.
 * 
 * Returns:
 * - listings: Array of properties
 * - loading: Boolean to show loading state
 * - error: Any error message if fetch fails
 */
export const useListings = () => {
  // State Management
  const [listings, setListings] = useState<Property[]>(mockListings); // Initialize with mock data
  const [loading, setLoading] = useState(false); // Start with false since we have initial data
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isSubscribed = true;

    const fetchListings = async () => {
      try {
        // TODO: Replace with Firebase in production
        // For now, we're using mock data, so just simulate a quick update
        await new Promise(resolve => setTimeout(resolve, 300));
        
        if (isSubscribed) {
          setListings(mockListings);
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching listings:', err);
        if (isSubscribed) {
          setError('Failed to fetch latest listings');
        }
      } finally {
        if (isSubscribed) {
          setLoading(false);
        }
      }
    };

    fetchListings();

    // Cleanup function
    return () => {
      isSubscribed = false;
    };
  }, []); // Empty array means this runs once when component mounts

  return { 
    listings,
    loading,
    error 
  };
};

/* 
HOW TO USE THIS HOOK:
--------------------
In any component, you can use it like this:

function MyComponent() {
  const { listings, loading, error } = useListings();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <View>
      {listings.map(listing => (
        <ListingCard key={listing.id} {...listing} />
      ))}
    </View>
  );
}
*/ 