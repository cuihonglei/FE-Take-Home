import { useState, useEffect } from 'react';
import Fruit from '../types/Fruit';

const useFetchFruits = (endPoint: string) => {

  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFruits = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error state
      try {
        const response = await fetch(endPoint);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setFruits(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchFruits();
  }, [endPoint]);

  return { fruits, loading, error };
};

export default useFetchFruits;
