import { useMemo } from 'react';
import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import { Answer } from '@/components/answer';
import { Leaderboard } from '@/components/leaderboard';
import { PlayersWaiting } from '@/components/players-waiting';
import { Confetti } from '@/components/confetti';
import { usePlay } from '@/hooks/use-play.hook';
import { STREAK_THRESHOLDS } from '@/config/constants';

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
    </Flex>
  );

  const renderAnswerData = () => {
    const streak = leaderboard.find((it) => it.name === user)?.streak;

    return (
      <Box px={2} textAlign="center">
        <Text>
          <Text as="span" fontWeight={800}>
            Answer:
          </Text>{' '}
          {prevRoundAnswer}{' '}
          {!!selectedAnswer?.answer &&
            `(${
              prevRoundAnswer === selectedAnswer?.answer
                ? 'CORRECT'
                : 'INCORRECT'
            })`}
        </Text>
        {STREAK_THRESHOLDS.includes(streak ?? 0) && (
          <Text fontWeight={800}>{streak} in a row!</Text>
        )}
      </Box>
    );
  };

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
            Stage: {currentStage}/{stages}
          </Text>
        )}
        {gameState !== 'finished' && (
          <Text as="h2" fontSize="xl" textAlign="center">
            {currCountdown || 'Waiting...'}
          </Text>
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
      </Flex>
    );
  };

  return gameState === 'idle' ? (
    <PlayersWaiting players={players} />
  ) : (
    renderContent()
  );
};
