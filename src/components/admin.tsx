import { Players } from '@/components/players';
import { GuessesLog } from '@/components/guesses-log';
import { ConnectedPlayers } from '@/components/connected-players';
import { StageInfo } from '@/components/stage-info';
import { useAdmin } from '@/hooks/use-admin.hook';
import { Config } from './config';
import { Card } from './card/card';
import { CardBody } from './card/card-body';
import { GameStartCard } from './game-start-card';
import { useRouter } from 'next/router';

export const Admin = () => {
  const {
    startGame,
    resetGame,
    gameState,
    players,
    guessLog,
    currentStage,
    answersData,
    sortedPlayers,
    guessCountdown,
    countdown,
    currentStageAnswers,
    playlistId,
    setPlaylistId,
    stages,
    roomId,
    handleStagesUpdate,
  } = useAdmin();
  const { push } = useRouter();

  return (
    <div className="flex flex-col p-4 gap-4 flex-wrap justify-center">
      <Card>
        <div className="flex flex-1 items-center justify-between p-5">
          <p className="text-white">Room ID: {roomId}</p>
          <button
            className="py-2 px-4 bg-green-600 rounded disabled:opacity-60 disabled:cursor-not-allowed hover:bg-green-500 transition-colors text-white"
            onClick={() => push(`/rooms/${roomId}/leaderboard`)}
          >
            View
          </button>
        </div>
      </Card>
      {['idle', 'loading'].includes(gameState) && (
        <GameStartCard
          playlistId={playlistId}
          isStartDisabled={
            gameState === 'loading' || !players.length || !playlistId
          }
          setPlaylistId={setPlaylistId}
          onStart={startGame}
        />
      )}
      {['idle', 'loading'].includes(gameState) && (
        <Config stages={stages} onStagesUpdate={handleStagesUpdate} />
      )}
      {gameState !== 'finished' && (
        <StageInfo
          stages={stages}
          stage={currentStage}
          gameState={gameState}
          countdown={countdown}
          guessCountdown={guessCountdown}
          stageAnswers={currentStageAnswers}
          correctAnswer={answersData[currentStage - 1]?.correctAnswer}
        />
      )}
      {gameState !== 'idle' && sortedPlayers.length > 0 && (
        <Players players={sortedPlayers} />
      )}
      {players.length > 0 && <ConnectedPlayers players={players} />}
      {guessLog.length > 0 && <GuessesLog guesses={guessLog} />}
      {gameState === 'finished' && (
        <Card>
          <CardBody>
            <button
              className="py-2 px-4 rounded bg-red-800 hover:bg-red-700 transition-colors text-white"
              onClick={resetGame}
            >
              Reset
            </button>
          </CardBody>
        </Card>
      )}
    </div>
  );
};
