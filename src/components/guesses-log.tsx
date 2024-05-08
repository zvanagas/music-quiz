import { PlayerGuess } from '@/types/events';
import {
  UnorderedList,
  ListItem,
  Card,
  CardHeader,
  CardBody,
  Heading,
} from '@chakra-ui/react';

type GuessesLogProps = {
  guesses: PlayerGuess[];
};

export const GuessesLog = ({ guesses }: GuessesLogProps) => {
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
