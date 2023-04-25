import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSocket } from '@/contexts/socket-provider';
import { useSessionStorage } from '@/hooks/use-session-storage';
import { useRouter } from 'next/router';
import useCountdown from '@/hooks/use-countdown.hook';
import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import {
  PlayerData,
  Results,
  SelectedAnswer,
  Start,
  Wait,
} from '@/interfaces/events';
import Answer from '@/components/answer';
import Leaderboard from '@/components/leaderboard';
import PlayersWaiting from '@/components/players-waiting';
import { WAIT_TIME, GUESS_TIME, STAGES } from '@/config/constants';
import Confetti from '@/components/confetti';
import { Events } from '@/enums/events';
import { GameStates } from '@/types/game-states';

const Play: React.FC = () => {
  const [id] = useSessionStorage('id');
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<SelectedAnswer>();
  const [currentStage, setCurrentStage] = useState(0);
  const [gameState, setGameState] = useState<GameStates>('idle');
  const [prevRoundAnswer, setPrevRoundAnswer] = useState('');
  const [players, setPlayers] = useState<string[]>([]);
  const [leaderboard, setLeaderboard] = useState<PlayerData[]>([]);
  const { countdown, startCountdown } = useCountdown(() =>
    setSelectedAnswer(undefined)
  );
  const { countdown: guessCountdown, startCountdown: startGuessCountdown } =
    useCountdown();
  const socket = useSocket();
  const router = useRouter();

  useEffect(() => {
    if (!id) {
      router.push('/');
    }
  }, [id, router]);

  useEffect(() => {
    if (id && socket) {
      socket.emit(Events.Join, id);
    }
  }, [socket, id]);

  const onStartGame = useCallback(
    ({ answers, stage, scores }: Start) => {
      setPrevRoundAnswer('');
      startCountdown(WAIT_TIME);
      setAnswers(answers);
      setCurrentStage(stage);
      setLeaderboard(scores);
      setGameState('waiting');
    },
    [startCountdown]
  );

  const onWait = useCallback(
    (params: Wait) => {
      setGameState('waiting');
      setAnswers(params.answers);
      setCurrentStage(params.stage);
      setPrevRoundAnswer(params.correctAnswer);
      setLeaderboard(params.scores);
      startCountdown(WAIT_TIME);
    },
    [startCountdown]
  );

  const onGuess = useCallback(() => {
    setGameState('guessing');
    startGuessCountdown(GUESS_TIME);
  }, [startGuessCountdown]);

  const onResults = useCallback(({ correctAnswer, scores }: Results) => {
    setLeaderboard(scores);
    setPrevRoundAnswer(correctAnswer);
    setGameState('finished');
  }, []);

  const onReset = useCallback(() => {
    setPrevRoundAnswer('');
    setLeaderboard([]);
    setAnswers([]);
    setSelectedAnswer(undefined);
    setCurrentStage(0);
    setGameState('idle');
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on(Events.Start, onStartGame);
      socket.on(Events.Wait, onWait);
      socket.on(Events.Guess, onGuess);
      socket.on(Events.Results, onResults);
      socket.on(Events.Players, setPlayers);
      socket.on(Events.Reset, onReset);
    }

    return () => {
      socket?.off(Events.Start, onStartGame);
      socket?.off(Events.Wait, onWait);
      socket?.off(Events.Guess, onGuess);
      socket?.off(Events.Results, onResults);
      socket?.off(Events.Players, setPlayers);
    };
  }, [onGuess, onReset, onResults, onStartGame, onWait, socket]);

  const guess = (answer: string, index: number) => {
    if (selectedAnswer) {
      return;
    }
    const guessAnswer = {
      index,
      answer,
      time: guessCountdown ?? 0,
    };
    setSelectedAnswer(guessAnswer);
    socket?.emit(Events.PlayerGuess, { ...guessAnswer, name: id });
  };
  const currCountdown = useMemo(() => {
    if (countdown) {
      return (
        <>
          Wait time:{' '}
          <Text as="span" fontWeight={800}>
            {countdown}
          </Text>{' '}
          seconds
        </>
      );
    }
    if (guessCountdown) {
      return (
        <>
          Guessing time:{' '}
          <Text as="span" fontWeight={800}>
            {guessCountdown}
          </Text>{' '}
          seconds
        </>
      );
    }

    return 0;
  }, [countdown, guessCountdown]);

  const renderGuessContent = () => (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="full"
      height="full"
    >
      <Grid gridTemplateColumns={'1fr 1fr'} gap={4}>
        {answers.map((song, i) => (
          <Answer
            key={song}
            index={i}
            fullSongName={song}
            selectedAnswer={selectedAnswer}
            gameState={gameState}
            onClick={guess}
          />
        ))}
      </Grid>
    </Flex>
  );

  const renderContent = () => {
    return (
      <Flex
        flexDirection="column"
        alignItems="center"
        gap={4}
        py={8}
        height="full"
      >
        {gameState !== 'finished' && (
          <Text fontSize="4xl">
            Stage: {currentStage}/{STAGES}
          </Text>
        )}
        {gameState !== 'finished' && (
          <Text as="h2" fontSize={'xl'}>
            {currCountdown || 'Waiting...'}
          </Text>
        )}
        {['waiting', 'finished'].includes(gameState) && prevRoundAnswer && (
          <Box px={2} textAlign={'center'}>
            <Text as="span" fontWeight={800}>
              Answer:
            </Text>{' '}
            <Text>
              {prevRoundAnswer}{' '}
              {!!selectedAnswer?.answer &&
                `(${
                  prevRoundAnswer === selectedAnswer?.answer
                    ? 'CORRECT'
                    : 'INCORRECT'
                })`}
            </Text>
          </Box>
        )}
        {leaderboard.length > 0 &&
          ['waiting', 'finished'].includes(gameState) && (
            <Leaderboard
              playerName={id}
              scores={leaderboard}
              withReveal={gameState === 'finished'}
            />
          )}
        {gameState === 'guessing' && renderGuessContent()}
        {gameState === 'finished' && <Confetti />}
      </Flex>
    );
  };

  return gameState === 'idle' ? (
    <PlayersWaiting players={players} />
  ) : (
    renderContent()
  );
};

export default Play;
