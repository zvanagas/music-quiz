const confettiStyles = [
  {
    left: '7%',
    transform: 'rotate(-40deg)',
    animationDelay: '182ms',
    animationDuration: '2116ms',
  },
  {
    left: '14%',
    transform: 'rotate(4deg)',
    animationDelay: '161ms',
    animationDuration: '2076ms',
  },
  {
    left: '21%',
    transform: 'rotate(-51deg)',
    animationDelay: '481ms',
    animationDuration: '2103ms',
  },
  {
    left: '28%',
    transform: 'rotate(61deg)',
    animationDelay: '334ms',
    animationDuration: '1708ms',
  },
  {
    left: '35%',
    transform: 'rotate(-52deg)',
    animationDelay: '302ms',
    animationDuration: '1776ms',
  },
  {
    left: '42%',
    transform: 'rotate(38deg)',
    animationDelay: '180ms',
    animationDuration: '2168ms',
  },
  {
    left: '49%',
    transform: 'rotate(11deg)',
    animationDelay: '395ms',
    animationDuration: '2200ms',
  },
  {
    left: '56%',
    transform: 'rotate(49deg)',
    animationDelay: '14ms',
    animationDuration: '1887ms',
  },
  {
    left: '63%',
    transform: 'rotate(-72deg)',
    animationDelay: '149ms',
    animationDuration: '1805ms',
  },
  {
    left: '70%',
    transform: 'rotate(10deg)',
    animationDelay: '351ms',
    animationDuration: '2059ms',
  },
  {
    left: '77%',
    transform: 'rotate(4deg)',
    animationDelay: '307ms',
    animationDuration: '2132ms',
  },
  {
    left: '84%',
    transform: 'rotate(42deg)',
    animationDelay: '464ms',
    animationDuration: '1776ms',
  },
  {
    left: '91%',
    transform: 'rotate(-72deg)',
    animationDelay: '429ms',
    animationDuration: '1818ms',
  },
];

export const Confetti = () => {
  const getClasses = (index: number) => {
    let classes = 'absolute top-0 opacity-0 animate-rain';
    if (index % 2 === 0) {
      classes += ' bg-blue-600';
    } else if ((index + 7) % 4 === 0) {
      classes += ' bg-red-600';
    } else {
      classes += ' bg-green-600';
    }
    if (index % 4 === 0) {
      classes += ' w-[5px] h-[12px]';
    } else if ((index + 3) % 3 === 0) {
      classes += ' w-[3px] h-[10px]';
    } else {
      classes += ' w-[10px] h-[30px]';
    }

    return classes;
  };

  return (
    <div className="flex justify-center items-center absolute top-0 overflow-hidden w-full h-full z-1000 pointer-events-none">
      {confettiStyles.map((style, index) => (
        <div
          key={index}
          className={getClasses(index)}
          style={{
            left: style.left,
            transform: style.transform,
            animationDelay: style.animationDelay,
            animationDuration: style.animationDuration,
          }}
        />
      ))}
    </div>
  );
};
