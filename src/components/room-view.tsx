import { Card } from './card/card';
import { useAdmin } from '@/hooks/use-admin.hook';
import { GameStartCard } from './game-start-card';
import { PlayerBox } from './player-box';
import { LeaderboardRow } from './leaderboard/leaderboard-row';
import { Answer } from './answer';
import { Confetti } from './confetti';

type Props = {
  roomId: string;
};

export const RoomView = ({ roomId }: Props) => {
  const {
    gameState,
    players,
    playlistId,
    setPlaylistId,
    startGame,
    resetGame,
    leaderboard,
    countdown,
    guessCountdown,
    currentStageAnswers,
  } = useAdmin();

  const renderStartGame = () => (
    <GameStartCard
      playlistId={playlistId}
      isStartDisabled={
        gameState === 'loading' || !players.length || !playlistId
      }
      setPlaylistId={setPlaylistId}
      onStart={startGame}
    />
  );

  const renderWaitingPlayers = () => (
    <Card>
      <div className="flex flex-col flex-1 items-stretch justify-stretch p-5 text-white">
        <span>Players</span>
        <div className="flex justify-center flex-wrap">
          {players.map((player) => (
            <PlayerBox key={player} name={player} />
          ))}
        </div>
      </div>
    </Card>
  );

  const renderGuessContent = () => (
    <Card>
      <div className="flex flex-col items-center justify-center w-full h-full p-5">
        <div className="grid grid-cols-2 gap-4">
          {currentStageAnswers.map((song, i) => (
            <Answer
              key={song}
              index={i}
              fullSongName={song}
              gameState={gameState}
              isDisabled
            />
          ))}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="flex flex-col gap-2">
      <Card>
        <div className="flex flex-1 items-center justify-center gap-2 p-5 text-white">
          <span className="text-xl font-bold">Room ID: {roomId}</span>
          {gameState === 'finished' && (
            <button
              className="py-2 px-4 rounded bg-red-800 hover:bg-red-700 transition-colors text-white"
              onClick={resetGame}
            >
              Reset game
            </button>
          )}
        </div>
      </Card>
      {gameState === 'loading' && (
        <Card>
          <div className="flex justify-center p-5 text-white text-xl">
            Loading...
          </div>
        </Card>
      )}
      {(gameState === 'waiting' || gameState === 'guessing') && (
        <Card>
          <div className="flex items-center justify-center p-5 text-xl">
            {gameState === 'waiting' && (
              <p className="text-white">Wait time: {countdown}s</p>
            )}
            {gameState === 'guessing' && (
              <p className="text-white">Guess time: {guessCountdown}s</p>
            )}
          </div>
        </Card>
      )}
      {gameState === 'idle' && renderStartGame()}
      {gameState === 'idle' && renderWaitingPlayers()}
      {gameState === 'guessing' && renderGuessContent()}
      {(gameState === 'waiting' || gameState === 'finished') && (
        <>
          <Card>
            <div className="flex flex-col gap-2 p-2">
              {leaderboard.map((it, i) => (
                <LeaderboardRow
                  key={it.name}
                  place={i + 1}
                  name={it.name}
                  score={it.score}
                  plusPoints={it.plusPoints}
                  totalRowsCount={leaderboard.length}
                  shouldAppear={gameState === 'finished'}
                />
              ))}
            </div>
          </Card>
          {gameState === 'finished' && <Confetti />}
        </>
      )}
    </div>
  );
};
