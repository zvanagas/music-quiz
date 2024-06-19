import { PlayerData } from '@/types/events';
import { Card } from './card/card';
import { CardHeader } from './card/card-header';
import { CardBody } from './card/card-body';
import { Heading } from './heading';

type PlayersProps = {
  players: PlayerData[];
};

export const Players = ({ players }: PlayersProps) => {
  return (
    <Card>
      <CardHeader>
        <Heading>
          <p className="text-white">Leaderboard</p>
        </Heading>
      </CardHeader>
      <CardBody>
        <ol className="list-decimal ms-4 text-white">
          {players.map((it, i) => (
            <li key={i}>
              {it.name} {it.score} points
            </li>
          ))}
        </ol>
      </CardBody>
    </Card>
  );
};
