import { STAGES } from '@/config/constants';
import { endpoints } from '@/config/endpoints';
import { Config } from '@/types/config';
import { useCallback, useEffect, useState } from 'react';

export const useConfig = () => {
  const [config, setConfig] = useState<Config>({ stages: STAGES });

  useEffect(() => {
    fetch(endpoints.config)
      .then((res) => res.json())
      .then(setConfig)
      .catch(() => setConfig({ stages: STAGES }));
  }, []);

  const updateStages = useCallback(
    (stages: number) =>
      fetch(endpoints.config, {
        method: 'PATCH',
        body: JSON.stringify({ stages }),
      }).then(() => setConfig({ stages })),
    []
  );

  return {
    config,
    updateStages,
    setConfig,
  };
};
