import { PlayerData } from '@/types/events';
import { LeaderboardRow } from './leaderboard-row';

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
  return (
    <div className="flex flex-col self-center gap-2 w-[90%]">
      <p className="text-center font-extrabold text-2xl text-white">
        {isGameFinished ? 'Final Results' : 'Results'}
      </p>
      {scores.map((player, index) => (
        <LeaderboardRow
          key={player.name}
          place={index + 1}
          name={player.name}
          score={player.score}
          plusPoints={player.plusPoints}
          totalRowsCount={scores.length}
          shouldAppear={isGameFinished}
          isYours={playerName === player.name}
        />
      ))}
    </div>
  );
};
