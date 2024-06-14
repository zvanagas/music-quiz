import { GameStates } from '@/types/game-states';
import {
  Text,
  Heading,
  Box,
  OrderedList,
  ListItem,
  Divider,
  Button,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './card/card';
import { CardHeader } from './card/card-header';
import { CardBody } from './card/card-body';

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
        <Heading size="md">
          Stage {stage}/{stages}
        </Heading>
      </CardHeader>
      <CardBody>
        <div className="flex flex-col gap-4">
          {['idle', 'loading'].includes(gameState) && (
            <Text>Waiting for game to start...</Text>
          )}
          {gameState === 'waiting' && <Text>WAIT: {countdown}s</Text>}
          {gameState === 'guessing' && <Text>GUESS: {guessCountdown}s</Text>}
          {['waiting', 'guessing'].includes(gameState) && (
            <Box>
              <Divider my={2} />
              <Text>Possible answers:</Text>
              <OrderedList>
                {stageAnswers.map((answer) => (
                  <ListItem key={answer}>
                    <Text
                      fontWeight={
                        isAnswerShown && answer === correctAnswer
                          ? 800
                          : undefined
                      }
                    >
                      {answer}
                    </Text>
                  </ListItem>
                ))}
              </OrderedList>
            </Box>
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
