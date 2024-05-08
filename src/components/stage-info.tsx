import { GameStates } from '@/types/game-states';
import {
  Card,
  CardHeader,
  CardBody,
  Text,
  Heading,
  Box,
  OrderedList,
  ListItem,
  Divider,
  Button,
} from '@chakra-ui/react';
import { useState } from 'react';

type StageInfoProps = {
  stage: number;
  gameState: GameStates;
  countdown: number;
  guessCountdown: number;
  stageAnswers: string[];
  correctAnswer: string;
};

export const StageInfo = ({
  stage,
  gameState,
  countdown,
  guessCountdown,
  stageAnswers,
  correctAnswer,
}: StageInfoProps) => {
  const [isAnswerShown, setIsAnswerShown] = useState<boolean>(false);

  return (
    <Card>
      <CardHeader>
        <Heading size="md">Stage {stage}</Heading>
      </CardHeader>
      <CardBody display="flex" flexDir="column" gap={4}>
        {gameState === 'idle' && <Text>Waiting for game to start...</Text>}
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
        <Button onClick={() => setIsAnswerShown(!isAnswerShown)}>
          {isAnswerShown ? 'Hide answer' : 'Show answer'}
        </Button>
      </CardBody>
    </Card>
  );
};
