import { PlayerData } from '@/types/events';
import { ListItem, OrderedList } from '@chakra-ui/react';
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
        <Heading>Leaderboard</Heading>
      </CardHeader>
      <CardBody>
        <OrderedList>
          {players.map((it, i) => (
            <ListItem key={i}>
              {it.name} {it.score} points
            </ListItem>
          ))}
        </OrderedList>
      </CardBody>
    </Card>
  );
};
