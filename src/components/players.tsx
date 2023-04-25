import { PlayerData } from '@/interfaces/events';
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  ListItem,
  OrderedList,
} from '@chakra-ui/react';

interface PlayersProps {
  players: PlayerData[];
}

const Players: React.FC<PlayersProps> = ({ players }) => {
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

export default Players;
