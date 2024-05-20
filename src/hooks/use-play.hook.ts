import { WAIT_TIME, GUESS_TIME } from '@/config/constants';
import { useSocket } from '@/contexts/socket-provider';
import { Events } from '@/enums/events';
import {
  SelectedAnswer,
  PlayerData,
  Start,
  Wait,
  Results,
} from '@/types/events';
import { GameStates } from '@/types/game-states';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import { useCountdown } from './use-countdown.hook';
import { useSessionStorage } from './use-session-storage.hook';

export const usePlay = () => {
  const [id] = useSessionStorage('id');
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<SelectedAnswer>();
  const [currentStage, setCurrentStage] = useState(0);
  const [gameState, setGameState] = useState<GameStates>('idle');
  const [prevRoundAnswer, setPrevRoundAnswer] = useState('');
  const [players, setPlayers] = useState<string[]>([]);
  const [guessingStartTime, setGuessingStartTime] = useState<number>(0);
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
    setGuessingStartTime(Date.now());
  }, [startGuessCountdown]);

  const onResults = useCallback(({ correctAnswer, scores }: Results) => {
    setLeaderboard(scores);
    setPrevRoundAnswer(correctAnswer);
    setGameState('finished');
    setGuessingStartTime(0);
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
    const points = Math.ceil(
      (guessingStartTime - Date.now() + GUESS_TIME * 1000) / 10
    );
    const guessAnswer = {
      index,
      answer,
      points: points > 0 ? points : 0,
    };
    setSelectedAnswer(guessAnswer);
    socket?.emit(Events.PlayerGuess, { ...guessAnswer, name: id });
  };

  return {
    id,
    players,
    guess,
    countdown,
    guessCountdown,
    answers,
    selectedAnswer,
    gameState,
    currentStage,
    prevRoundAnswer,
    leaderboard,
  };
};
