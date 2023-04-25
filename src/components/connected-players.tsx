import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  ListItem,
  OrderedList,
} from '@chakra-ui/react';

interface ConnectedPlayersProps {
  players: string[];
}

const ConnectedPlayers: React.FC<ConnectedPlayersProps> = ({ players }) => {
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

export default ConnectedPlayers;
