import { PlayerData } from '@/interfaces/events';
import { Flex, Text } from '@chakra-ui/react';
import LeaderboardRow from './leaderboard-row';
import appear from '@/animations/appear';

interface LeaderboardProps {
  scores: PlayerData[];
  playerName: string;
  withReveal?: boolean;
}

const Leaderboard: React.FC<LeaderboardProps> = ({
  scores,
  playerName,
  withReveal,
}) => {
  const maximumDelay = scores.length * 2000;
  const leaderboardSx = (index: number) => ({
    animation: `${appear} 3s normal forwards`,
    animationDelay: `${maximumDelay - index * 2000}ms`,
    opacity: 0,
  });

  return (
    <Flex flexDirection="column" alignSelf="center" gap={2} width="90%">
      <Text textAlign="center" fontWeight="extrabold" fontSize="2xl">
        Results
      </Text>
      {scores.map((player, index) => (
        <LeaderboardRow
          sx={withReveal ? leaderboardSx(index) : undefined}
          key={player.name}
          place={index + 1}
          name={player.name}
          score={player.score}
          isYours={playerName === player.name}
        />
      ))}
    </Flex>
  );
};

export default Leaderboard;
