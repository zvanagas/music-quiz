'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSocket } from '@/contexts/socket-provider';
import useCountdown from '@/hooks/use-countdown.hook';
import Players from '@/components/players';
import { Button, Card, CardBody, Flex, Select } from '@chakra-ui/react';
import useLoadSongs from '@/hooks/use-load-songs.hook';
import {
  GUESS_TIME,
  POINTS_PER_SECOND,
  STAGES,
  VICTORY_SONG,
  WAIT_TIME,
} from '@/config/constants';
import GuessesLog from '@/components/guesses-log';
import ConnectedPlayers from '@/components/connected-players';
import StageInfo from '@/components/stage-info';
import { loadSong } from '@/utils';
import { AnswersData, PlayerData, PlayerGuess } from '@/interfaces/events';
import { Events } from '@/enums/events';
import { GameStates } from '@/types/game-states';

const Admin = () => {
  const [loadedSongs, setLoadedSongs] = useState<HTMLAudioElement[]>([]);
  const [answersData, setAnswersData] = useState<AnswersData[]>([]);
  const [players, setPlayers] = useState<string[]>([]);
  const [leaderboard, setLeaderboard] = useState<PlayerData[]>([]);
  const [currentStage, setCurrentStage] = useState<number>(0);
  const [gameState, setGameState] = useState<GameStates>('idle');
  const [category, setCategory] = useState<string>('all');
  const [guessLog, setGuessLog] = useState<PlayerGuess[]>([]);
  const [victorySong, setVictorySong] = useState<HTMLAudioElement | null>(null);
  const socket = useSocket();
  const { load } = useLoadSongs();
  const sortedPlayers = leaderboard.sort((a, b) => b.score - a.score);
  const previousStageSong = useMemo(
    () => loadedSongs[currentStage - 2],
    [loadedSongs, currentStage]
  );

  const onGuessCountdownFinish = () => {
    if (currentStage === STAGES) {
      setGameState('finished');
      socket?.emit(Events.Results, {
        correctAnswer: answersData[currentStage - 1].correctAnswer,
        scores: sortedPlayers,
      });
      currentStageSong?.pause();
      if (victorySong) {
        victorySong.currentTime = 0;
        victorySong.play();
      }
      return;
    }

    setCurrentStage((prevStage) => prevStage + 1);
    startCountdown(WAIT_TIME);
    setGameState('waiting');
    socket?.emit(Events.Wait, {
      answers: answersData[currentStage].answers,
      stage: currentStage + 1,
      correctAnswer: answersData[currentStage - 1].correctAnswer,
      scores: sortedPlayers,
    });
  };

  const onWaitCountdownFinish = () => {
    if (!currentStageSong) {
      return;
    }

    previousStageSong?.pause();

    socket?.emit(Events.Guess);
    // const rand = Math.floor(
    //   Math.random() * Math.floor(currentStageSong.duration - 20)
    // );
    // setCurrentTimeSong(rand);
    // currentStageSong.currentTime = rand;
    currentStageSong.volume = 1;
    currentStageSong.play();
    startGuessCountdown(GUESS_TIME);
    setGameState('guessing');
  };

  const { countdown, startCountdown } = useCountdown(onWaitCountdownFinish);
  const { countdown: guessCountdown, startCountdown: startGuessCountdown } =
    useCountdown(onGuessCountdownFinish);

  useEffect(() => {
    if (!previousStageSong) {
      return;
    }

    if (previousStageSong.volume >= 0.125) {
      previousStageSong.volume = previousStageSong.volume - 0.125;
    }
    if (previousStageSong.volume < 0.125) {
      previousStageSong.pause();
    }
  }, [countdown, previousStageSong]);

  const onPlayerGuess = useCallback(
    (data: PlayerGuess) => {
      setGuessLog((prevLog) => [data, ...prevLog]);

      if (
        !answersData[currentStage - 1] ||
        answersData[currentStage - 1].correctAnswer !== data.answer
      ) {
        return;
      }

      setLeaderboard((prevPlayers) => {
        let playerIndex = prevPlayers.findIndex((it) => it.name === data.name);
        if (playerIndex < 0) {
          playerIndex = prevPlayers.length;
        }
        const playerList = [...prevPlayers];
        playerList[playerIndex] = {
          name: data.name,
          score:
            (playerList[playerIndex]?.score ?? 0) +
            data.time * POINTS_PER_SECOND,
        };

        return playerList;
      });
    },
    [answersData, currentStage]
  );

  useEffect(() => {
    if (socket) {
      socket.on(Events.Players, setPlayers);
      socket.on(Events.PlayerGuess, onPlayerGuess);
    }

    return () => {
      socket?.off(Events.Players, setPlayers);
      socket?.off(Events.PlayerGuess, onPlayerGuess);
    };
  }, [onPlayerGuess, socket]);

  const currentStageAnswers = useMemo(
    () => answersData[currentStage - 1]?.answers ?? [],
    [answersData, currentStage]
  );

  const currentStageSong = useMemo(
    () => loadedSongs[currentStage - 1],
    [loadedSongs, currentStage]
  );

  const startGame = useCallback(async () => {
    const { answers, songList } = await load(category);
    if (!victorySong) {
      const victory = await loadSong(VICTORY_SONG);
      setVictorySong(victory);
    }
    setLoadedSongs(songList);
    setAnswersData(answers);
    setCurrentStage((prevStage) => prevStage + 1);
    const currLeaderboard = players.map((name) => ({ name, score: 0 }));
    setLeaderboard(currLeaderboard);
    socket?.emit(Events.Start, {
      answers: answers[0].answers,
      stage: 1,
      scores: currLeaderboard,
    });
    startCountdown(WAIT_TIME);
    setGameState('waiting');
  }, [load, category, victorySong, players, socket, startCountdown]);

  const resetGame = () => {
    setGuessLog([]);
    setLoadedSongs([]);
    setAnswersData([]);
    setLeaderboard([]);
    setCurrentStage(0);
    victorySong?.pause();
    setGameState('idle');
    socket?.emit(Events.Reset);
  };

  const renderStartGameCard = () => (
    <Card p={10}>
      <Select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">All</option>
        <option value="mix">Mix</option>
        <option value="2000">2000</option>
        <option value="2021">2021</option>
        <option value="2023">2023</option>
      </Select>
      <Button
        mt={4}
        colorScheme="green"
        onClick={startGame}
        isDisabled={gameState !== 'idle'}
      >
        Start game!
      </Button>
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
      {gameState === 'idle' && renderStartGameCard()}
      {gameState !== 'finished' && (
        <StageInfo
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

export default Admin;
