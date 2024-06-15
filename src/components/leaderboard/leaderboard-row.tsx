import { Card, CardBody, CardProps, HStack } from '@chakra-ui/react';
import { Avatar } from '../avatar';

type LeaderboardRowProps = CardProps & {
  place: number;
  name: string;
  score: number;
  plusPoints: number;
  isYours: boolean;
};

const positionColors = ['red.600', 'green.600', 'blue.600'];

export const LeaderboardRow = ({
  place,
  name,
  score,
  isYours,
  plusPoints,
  sx,
}: LeaderboardRowProps) => {
  return (
    <Card
      sx={sx}
      flex={1}
      bgColor={positionColors[place - 1]}
      border={isYours ? '3px solid' : undefined}
    >
      <CardBody
        display="flex"
        justifyContent="space-between"
        alignItems="center"
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
      </CardBody>
    </Card>
  );
};
