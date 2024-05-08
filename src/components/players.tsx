import { PlayerData } from '@/types/events';
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  ListItem,
  OrderedList,
} from '@chakra-ui/react';

type PlayersProps = {
  players: PlayerData[];
};

export const Players = ({ players }: PlayersProps) => {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">Leaderboard</Heading>
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
