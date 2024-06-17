import { HStack } from '@chakra-ui/react';
import { Avatar } from '../avatar';
import { CSSProperties } from 'react';

type LeaderboardRowProps = {
  place: number;
  name: string;
  score: number;
  plusPoints: number;
  isYours: boolean;
  totalRowsCount: number;
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
      <HStack>
        <p>{place}.</p>
        <HStack>
          <Avatar name={name} />
          <p className="font-bold">{name}</p>
        </HStack>
      </HStack>
      <p className="font-bold">
        {score} {plusPoints > 0 && ` (+${plusPoints})`}
      </p>
    </div>
  );
};
