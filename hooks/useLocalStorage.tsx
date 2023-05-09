import { Dispatch, useEffect, useState } from 'react';

export const PREFIX = 'Reactions: ';

export default function useLocalStorage<T>(key: string, initialValue: T) {
  const prefixedKey = PREFIX + key;

  const [value, setValue] = useState<T>(() => {
    const jsonValue = typeof window !== 'undefined' ? localStorage.getItem(prefixedKey) : null;
    if (jsonValue != null && jsonValue != 'undefined') {
      return JSON.parse(jsonValue);
    } else if (typeof initialValue === 'function') {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue] as const;
};
