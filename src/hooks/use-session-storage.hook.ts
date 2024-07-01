import { Dispatch, useEffect } from 'react';
import { useState } from 'react';

const PREFIX = 'mquiz-';

export const useSessionStorage = (
  key: string
): [string, Dispatch<React.SetStateAction<string>>] => {
  const keyWithPrefix = PREFIX + key;
  const [value, setValue] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const jsonValue = sessionStorage.getItem(keyWithPrefix);
      if (jsonValue != null) {
        return JSON.parse(jsonValue);
      }
    }
  });

  useEffect(() => {
    if (value) {
      sessionStorage.setItem(keyWithPrefix, JSON.stringify(value));
    }
  }, [keyWithPrefix, value]);

  return [value, setValue];
};
