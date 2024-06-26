import { Card } from './card/card';
import { CardHeader } from './card/card-header';
import { CardBody } from './card/card-body';
import { Heading } from './heading';

type ConnectedPlayersProps = {
  players: string[];
};

export const ConnectedPlayers = ({ players }: ConnectedPlayersProps) => {
  return (
    <Card>
      <CardHeader>
        <Heading>
          <p className="text-white">Connected players</p>
        </Heading>
      </CardHeader>
      <CardBody>
        <ol className="list-decimal ms-4 text-white">
          {players.map((player, i) => (
            <li key={`${player}-${i}`}>{player}</li>
          ))}
        </ol>
      </CardBody>
    </Card>
  );
};
