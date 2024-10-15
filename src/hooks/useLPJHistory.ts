import { useState, useEffect } from 'react';
import { fetchLPJHistory } from '../services/api';
import { LPJHistoryItem } from '../types';

export const useLPJHistory = () => {
  const [history, setHistory] = useState<LPJHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await fetchLPJHistory();
        setHistory(data);
      } catch (err) {
        setError('Failed to load LPJ history.');
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  return { history, loading, error };
};