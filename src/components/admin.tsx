'use client';

import { Players } from '@/components/players';
import { GuessesLog } from '@/components/guesses-log';
import { ConnectedPlayers } from '@/components/connected-players';
import { StageInfo } from '@/components/stage-info';
import { useAdmin } from '@/hooks/use-admin.hook';
import { Config } from './config';
import { Card } from './card/card';
import { CardBody } from './card/card-body';

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

  const renderStartGameCards = () => (
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
          disabled={gameState === 'loading' || !players.length || !playlistId}
          onClick={startGame}
        >
          Start game!
        </button>
      </div>
    </Card>
  );

  return (
    <div className="flex flex-col p-4 gap-4 flex-wrap justify-center">
      <Card>
        <CardBody>
          <p className="text-white">Room ID: {roomId}</p>
        </CardBody>
      </Card>
      {['idle', 'loading'].includes(gameState) && renderStartGameCards()}
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
