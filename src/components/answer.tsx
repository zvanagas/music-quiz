import { SONG_NAME_LIMIT } from '@/config/constants';
import { SelectedAnswer } from '@/types/events';
import { GameState } from '@/types/game-state';

const colorSchemes = [
  'bg-blue-600 hover:bg-blue-500',
  'bg-yellow-600 hover:bg-yellow-500',
  'bg-green-600 hover:bg-green-500',
  'bg-red-600 hover:bg-red-500',
];

type AnswerProps = {
  index: number;
  selectedAnswer?: SelectedAnswer;
  fullSongName: string;
  gameState: GameState;
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
      ? 'disabled:opacity-20'
      : 'disabled:opaicty-80';
  return (
    <button
      className={`flex flex-col items-center justify-center overflow-hidden rounded text-white transition-colors w-40 h-40 select-none ${opacity} ${colorSchemes[index]}`}
      disabled={!!selectedAnswer || gameState !== 'guessing'}
      onClick={() => onClick(fullSongName, index)}
    >
      <p className="px-2 text-white">{artist}</p>
      <hr className="opacity-20 w-full h-1 bg-slate-800 my-2" />
      <p className="px-2 break-words text-white">{songName}</p>
    </button>
  );
};
