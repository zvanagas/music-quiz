import { SelectedAnswer } from '@/interfaces/events';
import { GameStates } from '@/types/game-states';
import { Button, Divider, ThemingProps, Text } from '@chakra-ui/react';

const colorSchemes: ThemingProps['colorScheme'][] = [
  'blue',
  'yellow',
  'green',
  'red',
];

interface AnswerProps {
  index: number;
  selectedAnswer?: SelectedAnswer;
  fullSongName: string;
  gameState: GameStates;
  onClick: (song: string, index: number) => void;
}

const Answer: React.FC<AnswerProps> = ({
  index,
  selectedAnswer,
  fullSongName,
  gameState,
  onClick,
}) => {
  const [artist, song] = fullSongName.split(' - ');
  const opacity =
    (selectedAnswer && selectedAnswer.answer !== fullSongName) ||
    gameState !== 'guessing'
      ? 0.2
      : 0.8;
  return (
    <Button
      size="xl"
      display="flex"
      flexDirection="column"
      _disabled={{ opacity }}
      isDisabled={!!selectedAnswer || gameState !== 'guessing'}
      colorScheme={colorSchemes[index]}
      onClick={() => onClick(fullSongName, index)}
    >
      <Text px={2}>{artist}</Text>
      <Divider bgColor={'black'} my={2} height={1} />
      <Text px={2} wordBreak={'break-word'}>
        {song}
      </Text>
    </Button>
  );
};

export default Answer;
