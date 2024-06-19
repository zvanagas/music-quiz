import { PlayerBox } from './player-box';

type PlayersWaitingProps = {
  players: string[];
};

export const PlayersWaiting = ({ players }: PlayersWaitingProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 h-full">
      <p className="mt-1 text-4xl text-white">Waiting...</p>
      <div className="flex flex-wrap items-center justify-center">
        {players.map((name) => (
          <PlayerBox key={name} name={name} />
        ))}
      </div>
    </div>
  );
};
