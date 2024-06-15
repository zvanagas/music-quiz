import { SONG_NAME_LIMIT } from '@/config/constants';
import { SelectedAnswer } from '@/types/events';
import { GameStates } from '@/types/game-states';
import { Button, Divider, ThemingProps } from '@chakra-ui/react';

const colorSchemes: ThemingProps['colorScheme'][] = [
  'blue',
  'yellow',
  'green',
  'red',
];

type AnswerProps = {
  index: number;
  selectedAnswer?: SelectedAnswer;
  fullSongName: string;
  gameState: GameStates;
  onClick: (song: string, index: number) => void;
};

export const Answer = ({
  index,
  selectedAnswer,
  fullSongName,
  gameState,
  onClick,
}: AnswerProps) => {
  const [artist, ...song] = fullSongName.split(' - ');
  const joinedSong = song.join(' - ');
  const songName =
    joinedSong.length >= SONG_NAME_LIMIT
      ? joinedSong.substring(0, SONG_NAME_LIMIT) + '...'
      : joinedSong;
  const opacity =
    (selectedAnswer && selectedAnswer.answer !== fullSongName) ||
    gameState !== 'guessing'
      ? 0.2
      : 0.8;
  return (
    <Button
      size="xl"
      display="flex"
      overflow="hidden"
      flexDirection="column"
      _disabled={{ opacity }}
      isDisabled={!!selectedAnswer || gameState !== 'guessing'}
      colorScheme={colorSchemes[index]}
      onClick={() => onClick(fullSongName, index)}
    >
      <p className="px-2">{artist}</p>
      <Divider bgColor="black" my={2} height={1} />
      <p className="px-2 break-words">{songName}</p>
    </Button>
  );
};
