import { Flex, Text } from '@chakra-ui/react';
import PlayerBox from './player-box';

interface PlayersWaitingProps {
  players: string[];
}

const PlayersWaiting: React.FC<PlayersWaitingProps> = ({ players }) => {
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

export default PlayersWaiting;
