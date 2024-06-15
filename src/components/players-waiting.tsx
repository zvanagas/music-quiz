import { Flex } from '@chakra-ui/react';
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
      <p className="mt-1 text-4xl">Waiting...</p>
      <Flex flexWrap="wrap" alignItems="center" justifyContent="center">
        {players.map((name) => (
          <PlayerBox key={name} name={name} />
        ))}
      </Flex>
    </Flex>
  );
};
