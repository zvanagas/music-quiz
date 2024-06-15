import { ListItem, OrderedList } from '@chakra-ui/react';
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
        <Heading>Connected players</Heading>
      </CardHeader>
      <CardBody>
        <OrderedList>
          {players.map((player, i) => (
            <ListItem key={`${player}-${i}`}>{player}</ListItem>
          ))}
        </OrderedList>
      </CardBody>
    </Card>
  );
};
