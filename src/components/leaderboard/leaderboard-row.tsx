import { Card, CardBody, CardProps, HStack, Text } from '@chakra-ui/react';
import { Avatar } from '../avatar';

type LeaderboardRowProps = CardProps & {
  place: number;
  name: string;
  score: number;
  isYours: boolean;
};

const positionColors = ['red.600', 'green.600', 'blue.600'];

export const LeaderboardRow = ({
  place,
  name,
  score,
  isYours,
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
          <Text>{place}.</Text>
          <HStack>
            <Avatar name={name} />
            <Text fontSize="l" fontWeight="bold">
              {name}
            </Text>
          </HStack>
        </HStack>
        <Text fontSize="l" fontWeight="bold">
          {score}
        </Text>
      </CardBody>
    </Card>
  );
};
