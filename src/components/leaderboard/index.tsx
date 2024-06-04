import { PlayerData } from '@/types/events';
import { Flex, Text } from '@chakra-ui/react';
import { LeaderboardRow } from './leaderboard-row';
import { appear } from '@/animations/appear';

type LeaderboardProps = {
  scores: PlayerData[];
  playerName: string;
  isGameFinished?: boolean;
};

export const Leaderboard = ({
  scores,
  playerName,
  isGameFinished,
}: LeaderboardProps) => {
  const maximumDelay = scores.length * 2000;
  const leaderboardSx = (index: number) => ({
    animation: `${appear} 3s normal forwards`,
    animationDelay: `${maximumDelay - index * 2000}ms`,
    opacity: 0,
  });

  return (
    <Flex flexDirection="column" alignSelf="center" gap={2} width="90%">
      <Text textAlign="center" fontWeight="extrabold" fontSize="2xl">
        {isGameFinished ? 'Final Results' : 'Results'}
      </Text>
      {scores.map((player, index) => (
        <LeaderboardRow
          sx={isGameFinished ? leaderboardSx(index) : undefined}
          key={player.name}
          place={index + 1}
          name={player.name}
          score={player.score}
          plusPoints={player.plusPoints}
          isYours={playerName === player.name}
        />
      ))}
    </Flex>
  );
};
