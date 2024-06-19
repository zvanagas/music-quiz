import { GameState } from '@/types/game-state';
import { useState } from 'react';
import { Card } from './card/card';
import { CardHeader } from './card/card-header';
import { CardBody } from './card/card-body';
import { Heading } from './heading';

type StageInfoProps = {
  stage: number;
  gameState: GameState;
  countdown: number;
  guessCountdown: number;
  stageAnswers: string[];
  correctAnswer: string;
  stages: number;
};

export const StageInfo = ({
  stage,
  gameState,
  countdown,
  guessCountdown,
  stageAnswers,
  correctAnswer,
  stages,
}: StageInfoProps) => {
  const [isAnswerShown, setIsAnswerShown] = useState<boolean>(false);

  return (
    <Card>
      <CardHeader>
        <Heading>
          <p className="text-white">
            Stage {stage}/{stages}
          </p>
        </Heading>
      </CardHeader>
      <CardBody>
        <div className="flex flex-col gap-4">
          {['idle', 'loading'].includes(gameState) && (
            <p className="text-white">Waiting for game to start...</p>
          )}
          {gameState === 'waiting' && (
            <p className="text-white">WAIT: {countdown}s</p>
          )}
          {gameState === 'guessing' && (
            <p className="text-white">GUESS: {guessCountdown}s</p>
          )}
          {['waiting', 'guessing'].includes(gameState) && (
            <div>
              <hr className="opacity-20 w-full h-1 bg-slate-800 my-2" />
              <p className="text-white">Possible answers:</p>
              <ol className="list-decimal ms-4 text-white">
                {stageAnswers.map((answer) => (
                  <li key={answer}>
                    <p
                      className={
                        isAnswerShown && answer === correctAnswer
                          ? 'font-extrabold'
                          : undefined
                      }
                    >
                      {answer}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          )}
          {!['idle', 'loading'].includes(gameState) && (
            <button
              className="bg-slate-600 rounded p-2 hover:bg-slate-500 transition-colors text-white"
              onClick={() => setIsAnswerShown(!isAnswerShown)}
            >
              {isAnswerShown ? 'Hide answer' : 'Show answer'}
            </button>
          )}
        </div>
      </CardBody>
    </Card>
  );
};
