import { Flex, Text } from '@chakra-ui/react';
import { PlayerBox } from './player-box';

type PlayersWaitingProps = {
  players: string[];
};

export const PlayersWaiting = ({ players }: PlayersWaitingProps) => {
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      py={10}
      height="full"
    >
      <Text mt={4} fontSize="4xl">
        Waiting...
      </Text>
      <Flex flexWrap="wrap" alignItems="center" justifyContent="center">
        {players.map((name) => (
          <PlayerBox key={name} name={name} />
        ))}
      </Flex>
    </Flex>
  );
};
