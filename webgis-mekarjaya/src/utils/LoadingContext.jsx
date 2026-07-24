import { useState, useEffect } from 'react';

export function useLoading(loadingState) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loadingState !== undefined) {
      setIsLoading(loadingState);
      return;
    }

    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [loadingState]);

  return isLoading;
}