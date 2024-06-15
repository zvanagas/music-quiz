import { PlayerGuess } from '@/types/events';
import { UnorderedList, ListItem } from '@chakra-ui/react';
import { Card } from './card/card';
import { CardHeader } from './card/card-header';
import { CardBody } from './card/card-body';
import { Heading } from './heading';

type GuessesLogProps = {
  guesses: PlayerGuess[];
};

export const GuessesLog = ({ guesses }: GuessesLogProps) => {
  return (
    <Card>
      <CardHeader>
        <Heading>Guesses</Heading>
      </CardHeader>
      <CardBody>
        <div className="max-h-[400px] overflow-y-auto">
          <UnorderedList>
            {guesses.map((it) => (
              <ListItem key={`${it.name}-${it.answer}`}>
                {it.name} guessed {it.answer} (Points {it.points})
              </ListItem>
            ))}
          </UnorderedList>
        </div>
      </CardBody>
    </Card>
  );
};
