import { Avatar } from '../avatar';
import { CSSProperties } from 'react';

type LeaderboardRowProps = {
  place: number;
  name: string;
  score: number;
  plusPoints: number;
  totalRowsCount: number;
  isYours?: boolean;
  shouldAppear?: boolean;
  style?: CSSProperties;
};

const positionColors = ['bg-red-600', 'bg-green-600', 'bg-blue-600'];

export const LeaderboardRow = ({
  place,
  name,
  score,
  isYours,
  plusPoints,
  totalRowsCount,
  shouldAppear,
}: LeaderboardRowProps) => {
  const maximumDelay = totalRowsCount * 2000;

  const getClasses = () => {
    let classes = `flex flex-1 p-5 justify-between items-center rounded shadow break-words ${
      positionColors[place - 1] ?? 'bg-slate-800'
    }`;

    if (isYours) {
      classes += ' border-2 border-solid border-white';
    }

    if (shouldAppear) {
      classes += ' animate-appear opacity-0';
    }

    return classes;
  };

  return (
    <div
      className={getClasses()}
      style={
        shouldAppear
          ? { animationDelay: `${maximumDelay - (place - 1) * 2000}ms` }
          : undefined
      }
    >
      <div className="flex items-center gap-0.5 text-white">
        <p>{place}.</p>
        <div className="flex items-center gap-0.5">
          <Avatar name={name} />
          <p className="font-bold">{name}</p>
        </div>
      </div>
      <p className="font-bold text-white">
        {score} {plusPoints > 0 && ` (+${plusPoints})`}
      </p>
    </div>
  );
};
