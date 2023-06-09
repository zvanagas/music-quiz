import { useCallback, useEffect, useState } from 'react';

type CountdownStates = 'idle' | 'running' | 'finished';

const useCountdown = (onCountdownFinish?: () => void) => {
  const [countdown, setCountdown] = useState(0);
  const [countdownState, setCountdownState] = useState<CountdownStates>('idle');

  const startCountdown = useCallback((count: number) => {
    setCountdown(count);
    setCountdownState('running');
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timer;
  
    if (countdownState === 'running') {
      interval = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [countdownState]);

  useEffect(() => {
    if (countdownState === 'running' && countdown === 0) {
      setCountdownState('finished');
      onCountdownFinish?.();
    }
  }, [countdown, countdownState, onCountdownFinish]);

  return {
    countdown,
    startCountdown,
  }
};

export default useCountdown;
