import { Heading, ListItem, OrderedList } from '@chakra-ui/react';
import { Card } from './card/card';
import { CardHeader } from './card/card-header';
import { CardBody } from './card/card-body';

type ConnectedPlayersProps = {
  players: string[];
};

export const ConnectedPlayers = ({ players }: ConnectedPlayersProps) => {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">Connected players</Heading>
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
