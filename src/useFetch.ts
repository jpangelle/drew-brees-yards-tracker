import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetch<T>(url: string): [T | null, boolean, string] {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axios.get(url);
        setData(response.data);
        setLoading(false);
        setError('');
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    })();
  }, [url]);

  return [data, loading, error];
}
