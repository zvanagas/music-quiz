'use client';

import { Players } from '@/components/players';
import { Button, Flex, Input } from '@chakra-ui/react';
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
        <Button
          mt={4}
          colorScheme="green"
          isDisabled={gameState === 'loading' || !players.length || !playlistId}
          onClick={startGame}
        >
          Start game!
        </Button>
      </CardBody>
    </Card>
  );

  return (
    <Flex
      flexDirection="column"
      p={4}
      gap={4}
      flexWrap="wrap"
      justifyContent="center"
    >
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
            <Button colorScheme="red" onClick={resetGame}>
              Reset
            </Button>
          </CardBody>
        </Card>
      )}
    </Flex>
  );
};
