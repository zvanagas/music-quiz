import { STAGES } from '@/config/constants';
import { Config } from '@/types/config';
import { useEffect, useState } from 'react';

export const useConfig = () => {
  const [config, setConfig] = useState<Config>({ stages: STAGES });

  useEffect(() => {
    fetch('/api/config')
      .then((res) => res.json())
      .then(setConfig)
      .catch(() => setConfig({ stages: STAGES }));
  }, []);

  return {
    config,
  };
};
