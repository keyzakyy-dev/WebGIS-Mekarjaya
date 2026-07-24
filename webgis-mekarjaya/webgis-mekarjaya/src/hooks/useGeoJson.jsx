import { useState, useEffect } from 'react';

export function useGeoJson(urls) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const results = {};
      
      for (const [key, url] of Object.entries(urls)) {
        try {
          const response = await fetch(url);
          if (!response.ok) throw new Error(`Failed to fetch ${url}`);
          const geojson = await response.json();
          results[key] = geojson;
        } catch (err) {
          console.error(`Error loading ${url}:`, err);
          results[key] = null;
        }
      }
      
      setData(results);
      setLoading(false);
    };

    loadData();
  }, [urls]);

  return { data, loading, error };
}