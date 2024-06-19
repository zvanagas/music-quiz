import { PlayerGuess } from '@/types/events';
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
        <Heading>
          <p className="text-white">Guesses</p>
        </Heading>
      </CardHeader>
      <CardBody>
        <div className="max-h-[400px] overflow-y-auto">
          <ul className="list-disc ms-4 text-white">
            {guesses.map((it) => (
              <li key={`${it.name}-${it.answer}`}>
                {it.name} guessed {it.answer} (Points {it.points})
              </li>
            ))}
          </ul>
        </div>
      </CardBody>
    </Card>
  );
};
