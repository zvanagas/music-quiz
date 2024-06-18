'use client';

import { Players } from '@/components/players';
import { Input } from '@chakra-ui/react';
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
      <CardBody>
        <p>Spotify Playlist ID</p>
        <Input
          value={playlistId}
          onChange={({ target }) => setPlaylistId(target.value)}
        />
        <button
          className="mt-4 bg-green-700 py-2 px-4 rounded disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={gameState === 'loading' || !players.length || !playlistId}
          onClick={startGame}
        >
          Start game!
        </button>
      </CardBody>
    </Card>
  );

  return (
    <div className="flex flex-col p-4 gap-4 flex-wrap justify-center">
      <Card>
        <CardBody>Room ID: {roomId}</CardBody>
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
              className="py-2 px-4 rounded bg-red-800"
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
