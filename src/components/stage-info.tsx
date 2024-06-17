import { GameStates } from '@/types/game-states';
import { OrderedList, ListItem, Divider, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './card/card';
import { CardHeader } from './card/card-header';
import { CardBody } from './card/card-body';
import { Heading } from './heading';

type StageInfoProps = {
  stage: number;
  gameState: GameStates;
  countdown: number;
  guessCountdown: number;
  stageAnswers: string[];
  correctAnswer: string;
  stages: number;
};

export const StageInfo = ({
  stage,
  gameState,
  countdown,
  guessCountdown,
  stageAnswers,
  correctAnswer,
  stages,
}: StageInfoProps) => {
  const [isAnswerShown, setIsAnswerShown] = useState<boolean>(false);

  return (
    <Card>
      <CardHeader>
        <Heading>
          Stage {stage}/{stages}
        </Heading>
      </CardHeader>
      <CardBody>
        <div className="flex flex-col gap-4">
          {['idle', 'loading'].includes(gameState) && (
            <p>Waiting for game to start...</p>
          )}
          {gameState === 'waiting' && <p>WAIT: {countdown}s</p>}
          {gameState === 'guessing' && <p>GUESS: {guessCountdown}s</p>}
          {['waiting', 'guessing'].includes(gameState) && (
            <div>
              <Divider my={2} />
              <p>Possible answers:</p>
              <OrderedList>
                {stageAnswers.map((answer) => (
                  <ListItem key={answer}>
                    <p
                      className={
                        isAnswerShown && answer === correctAnswer
                          ? 'font-extrabold'
                          : undefined
                      }
                    >
                      {answer}
                    </p>
                  </ListItem>
                ))}
              </OrderedList>
            </div>
          )}
          {!['idle', 'loading'].includes(gameState) && (
            <Button onClick={() => setIsAnswerShown(!isAnswerShown)}>
              {isAnswerShown ? 'Hide answer' : 'Show answer'}
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
};
