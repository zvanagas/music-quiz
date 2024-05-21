'use client';

import { Players } from '@/components/players';
import {
  Button,
  Card,
  CardBody,
  Flex,
  Input,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { GuessesLog } from '@/components/guesses-log';
import { ConnectedPlayers } from '@/components/connected-players';
import { StageInfo } from '@/components/stage-info';
import { useAdmin } from '@/hooks/use-admin.hook';
import { Config } from './config';

export const Admin = () => {
  const {
    startGame,
    resetGame,
    category,
    setCategory,
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
  } = useAdmin();

  const renderStartGameCards = () => (
    <Card>
      <CardBody>
        <Tabs>
          <TabList>
            <Tab>Presets</Tab>
            <Tab>Spotify</Tab>
          </TabList>
          <TabPanels>
            <TabPanel display="flex" flexDir="column">
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="all">All</option>
                <option value="mix">Mix</option>
                <option value="2000">2000</option>
                <option value="2021">2021</option>
                <option value="2023">2023</option>
              </Select>
              <Button
                mt={4}
                colorScheme="green"
                onClick={() => startGame('default')}
                isDisabled={gameState === 'loading'}
              >
                Start game!
              </Button>
            </TabPanel>
            <TabPanel display="flex" flexDir="column">
              <Input
                value={playlistId}
                onChange={({ target }) => setPlaylistId(target.value)}
              />
              <Button
                mt={4}
                colorScheme="green"
                isDisabled={gameState === 'loading'}
                onClick={() => startGame('spotify')}
              >
                Start game!
              </Button>
            </TabPanel>
          </TabPanels>
        </Tabs>
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
      {['idle', 'loading'].includes(gameState) && renderStartGameCards()}
      {['idle', 'loading'].includes(gameState) && <Config stages={stages} />}
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
