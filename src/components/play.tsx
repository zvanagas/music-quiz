import { useMemo } from 'react';
import { Grid } from '@chakra-ui/react';
import { Answer } from '@/components/answer';
import { Leaderboard } from '@/components/leaderboard';
import { PlayersWaiting } from '@/components/players-waiting';
import { usePlay } from '@/hooks/use-play.hook';
import { STREAK_THRESHOLDS } from '@/config/constants';
import { Confetti } from './confetti';

export const Play = () => {
  const {
    user,
    players,
    countdown,
    guess,
    guessCountdown,
    answers,
    selectedAnswer,
    currentStage,
    gameState,
    prevRoundAnswer,
    leaderboard,
    stages,
  } = usePlay();

  const currCountdown = useMemo(() => {
    if (countdown) {
      return (
        <>
          Wait time: <span className="font-extabold">{countdown}</span> seconds
        </>
      );
    }
    if (guessCountdown) {
      return (
        <>
          Guessing time: <span className="font-extabold">{guessCountdown}</span>{' '}
          seconds
        </>
      );
    }

    return 0;
  }, [countdown, guessCountdown]);

  const renderGuessContent = () => (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Grid gridTemplateColumns="1fr 1fr" gap={4}>
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
    </div>
  );

  const renderAnswerData = () => {
    const streak = leaderboard.find((it) => it.name === user)?.streak;

    return (
      <div className="px-2 text-center">
        <p>
          <span className="font-extrabold">Answer:</span> {prevRoundAnswer}{' '}
          {!!selectedAnswer?.answer &&
            `(${
              prevRoundAnswer === selectedAnswer?.answer
                ? 'CORRECT'
                : 'INCORRECT'
            })`}
        </p>
        {STREAK_THRESHOLDS.includes(streak ?? 0) && (
          <p className="font-extrabold">{streak} in a row!</p>
        )}
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className="flex flex-col items-center gap-4 py-8 h-full">
        {gameState !== 'finished' && (
          <p className="text-4xl">
            Stage: {currentStage}/{stages}
          </p>
        )}
        {gameState !== 'finished' && (
          <h2 className="text-xl text-center">
            {currCountdown || 'Waiting...'}
          </h2>
        )}
        {['waiting', 'finished'].includes(gameState) &&
          prevRoundAnswer &&
          renderAnswerData()}
        {leaderboard.length > 0 &&
          ['waiting', 'finished'].includes(gameState) && (
            <Leaderboard
              playerName={user}
              scores={leaderboard}
              isGameFinished={gameState === 'finished'}
            />
          )}
        {gameState === 'guessing' && renderGuessContent()}
        {gameState === 'finished' && <Confetti />}
      </div>
    );
  };

  return gameState === 'idle' ? (
    <PlayersWaiting players={players} />
  ) : (
    renderContent()
  );
};
