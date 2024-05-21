import { useMemo } from 'react';
import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import { Answer } from '@/components/answer';
import { Leaderboard } from '@/components/leaderboard';
import { PlayersWaiting } from '@/components/players-waiting';
import { Confetti } from '@/components/confetti';
import { usePlay } from '@/hooks/use-play.hook';

export const Play = () => {
  const {
    id,
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
          <Text as="h2" fontSize="xl">
            {currCountdown || 'Waiting...'}
          </Text>
        )}
        {['waiting', 'finished'].includes(gameState) && prevRoundAnswer && (
          <Box px={2} textAlign="center">
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
