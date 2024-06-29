import { Dispatch, SetStateAction } from 'react';
import { Card } from './card/card';

type Props = {
  playlistId: string;
  isStartDisabled: boolean;
  setPlaylistId: Dispatch<SetStateAction<string>>;
  onStart: () => void;
};

export const GameStartCard = ({
  playlistId,
  isStartDisabled,
  setPlaylistId,
  onStart,
}: Props) => {
  return (
    <Card>
      <div className="flex flex-col items-start flex-1 p-5 gap-2">
        <p className="text-white">Spotify Playlist ID</p>
        <input
          className="w-full h-10 rounded bg-transparent border text-white px-4"
          value={playlistId}
          onChange={({ target }) => setPlaylistId(target.value)}
        />
        <button
          className="bg-green-700 py-2 px-4 rounded disabled:opacity-60 disabled:cursor-not-allowed hover:bg-green-600 transition-colors text-white"
          disabled={isStartDisabled}
          onClick={onStart}
        >
          Start game!
        </button>
      </div>
    </Card>
  );
};
