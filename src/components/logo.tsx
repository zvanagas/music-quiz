import { useEffect, useState } from 'react';

const colors = [
  'bg-yellow-600',
  'bg-orange-600',
  'bg-green-600',
  'bg-blue-600',
];

export const Logo = () => {
  const [color, setColor] = useState<string>(colors[0]);

  useEffect(() => {
    const interval = setInterval(
      () => setColor(colors[Math.floor(Math.random() * 4)]),
      2000
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className={`flex items-center justify-center rounded-3xl text-xl w-40 h-40 transition-colors duration-800 ease-in-out animate-rotation ${color}`}
    >
      MuziQ
    </div>
  );
};
