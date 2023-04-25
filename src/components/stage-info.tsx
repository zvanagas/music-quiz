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
} from '@chakra-ui/react';

interface StageInfoProps {
  stage: number;
  gameState: GameStates;
  countdown: number;
  guessCountdown: number;
  stageAnswers: string[];
  correctAnswer: string;
}

const StageInfo: React.FC<StageInfoProps> = ({
  stage,
  gameState,
  countdown,
  guessCountdown,
  stageAnswers,
  correctAnswer,
}) => {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">Stage {stage}</Heading>
      </CardHeader>
      <CardBody>
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
                  <Text fontWeight={answer === correctAnswer ? 800 : undefined}>
                    {answer}
                  </Text>
                </ListItem>
              ))}
            </OrderedList>
          </Box>
        )}
      </CardBody>
    </Card>
  );
};

export default StageInfo;
