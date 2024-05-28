import {
  WAIT_TIME,
  GUESS_TIME,
  VICTORY_SONG,
  VOLUME_POINT,
} from '@/config/constants';
import { songs } from '@/config/songs';
import { useSocket } from '@/contexts/socket-provider';
import { Events } from '@/enums/events';
import { AnswersData, PlayerData, PlayerGuess } from '@/types/events';
import { GameStates } from '@/types/game-states';
import { loadSongs, loadSong } from '@/utils';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { useCountdown } from './use-countdown.hook';
import { Song } from '@/types/song';
import { useConfig } from './use-config.hook';
import { endpoints } from '@/config/endpoints';

export const useAdmin = () => {
  const [loadedSongs, setLoadedSongs] = useState<HTMLAudioElement[]>([]);
  const [answersData, setAnswersData] = useState<AnswersData[]>([]);
  const [players, setPlayers] = useState<string[]>([]);
  const [leaderboard, setLeaderboard] = useState<PlayerData[]>([]);
  const [currentStage, setCurrentStage] = useState<number>(0);
  const [gameState, setGameState] = useState<GameStates>('idle');
  const [category, setCategory] = useState<string>('all');
  const [guessLog, setGuessLog] = useState<PlayerGuess[]>([]);
  const [victorySong, setVictorySong] = useState<HTMLAudioElement | null>(null);
  const [playlistId, setPlaylistId] = useState<string>('');
  const socket = useSocket();
  const sortedPlayers = leaderboard.sort((a, b) => b.score - a.score);
  const previousStageSong = useMemo(
    () => loadedSongs[currentStage - 2],
    [loadedSongs, currentStage]
  );
  const { config, updateStages } = useConfig();

  const onGuessCountdownFinish = () => {
    if (currentStage === config?.stages) {
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
    // Logic to start song at random time
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

    if (previousStageSong.volume >= VOLUME_POINT) {
      previousStageSong.volume = previousStageSong.volume - VOLUME_POINT;
    }
    if (previousStageSong.volume < VOLUME_POINT) {
      previousStageSong.pause();
    }
  }, [countdown, previousStageSong]);

  const onPlayerGuess = useCallback(
    (data: PlayerGuess) => {
      setGuessLog((prevLog) => [data, ...prevLog]);

      const isCorrectAnswer =
        answersData[currentStage - 1] &&
        answersData[currentStage - 1].correctAnswer === data.answer;

      setLeaderboard((prevPlayers) => {
        let playerIndex = prevPlayers.findIndex((it) => it.name === data.name);
        if (playerIndex < 0) {
          playerIndex = prevPlayers.length;
        }
        const playerList = [...prevPlayers];
        const pointsToAdd = isCorrectAnswer ? data.points : 0;
        playerList[playerIndex] = {
          name: data.name,
          score: (playerList[playerIndex]?.score ?? 0) + pointsToAdd,
          plusPoints: pointsToAdd,
          streak: isCorrectAnswer
            ? (playerList[playerIndex]?.streak ?? 0) + 1
            : 0,
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

  const startGame = useCallback(
    async (type: 'default' | 'spotify') => {
      setGameState('loading');
      let currentSongs: Song[] = [];
      if (type === 'default') {
        currentSongs =
          category === 'all'
            ? songs
            : songs.filter(({ tag }) => category === tag);
      } else if (type === 'spotify') {
        currentSongs = await (
          await fetch(`${endpoints.spotify}?id=${playlistId}`)
        ).json();
      }
      const { answers, songList } = await loadSongs(
        currentSongs,
        config.stages,
        type === 'spotify'
      );
      if (!victorySong) {
        const victory = await loadSong(VICTORY_SONG);
        setVictorySong(victory);
      }
      setLoadedSongs(songList);
      setAnswersData(answers);
      setCurrentStage((prevStage) => prevStage + 1);
      const currLeaderboard = players.map((name) => ({
        name,
        score: 0,
        plusPoints: 0,
        streak: 0,
      }));
      setLeaderboard(currLeaderboard);
      socket?.emit(Events.Start, {
        answers: answers[0].answers,
        stage: 1,
        scores: currLeaderboard,
      });
      startCountdown(WAIT_TIME);
      setGameState('waiting');
    },
    [
      config.stages,
      victorySong,
      players,
      socket,
      startCountdown,
      category,
      playlistId,
    ]
  );

  const resetGame = useCallback(() => {
    setGuessLog([]);
    setLoadedSongs([]);
    setAnswersData([]);
    setLeaderboard([]);
    setCurrentStage(0);
    victorySong?.pause();
    setGameState('idle');
    socket?.emit(Events.Reset);
  }, [socket, victorySong]);

  const handleStagesUpdate = useCallback(
    (stages: number) => {
      updateStages(stages).then(() =>
        socket?.emit(Events.UpdateStages, stages)
      );
    },
    [socket, updateStages]
  );

  return {
    startGame,
    resetGame,
    category,
    setCategory,
    gameState,
    currentStage,
    players,
    guessLog,
    sortedPlayers,
    answersData,
    countdown,
    guessCountdown,
    currentStageAnswers,
    playlistId,
    setPlaylistId,
    stages: config.stages,
    handleStagesUpdate,
  };
};
