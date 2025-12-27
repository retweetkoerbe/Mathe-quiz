'use client';

// Simple hook for persistent score
import { useState, useEffect } from 'react';

export function usePersistedScore(key, initialValue = 0) {
  const [score, setScore] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(score));
    } catch (error) {
      console.error(error);
    }
  }, [key, score]);

  return [score, setScore];
}

