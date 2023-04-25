import { PlayerGuess } from '@/interfaces/events';
import {
  UnorderedList,
  ListItem,
  Card,
  CardHeader,
  CardBody,
  Heading,
} from '@chakra-ui/react';

interface GuessesLogProps {
  guesses: PlayerGuess[];
}

const GuessesLog: React.FC<GuessesLogProps> = ({ guesses }) => {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">Guesses</Heading>
      </CardHeader>
      <CardBody maxHeight={400} overflowY="auto">
        <UnorderedList>
          {guesses.map((it) => (
            <ListItem key={`${it.name}-${it.answer}`}>
              {it.name} guessed {it.answer} (Time {it.time})
            </ListItem>
          ))}
        </UnorderedList>
      </CardBody>
    </Card>
  );
};

export default GuessesLog;
