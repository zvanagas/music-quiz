import { Events } from '@/enums/events';

export type Start = {
  answers: AnswersData['answers'];
  stage: number;
  scores: PlayerData[];
};

export type Wait = {
  answers: AnswersData['answers'];
  correctAnswer: AnswersData['correctAnswer'];
  stage: number;
  scores: PlayerData[];
};

export type PlayerGuess = {
  index: number;
  answer: string;
  name: string;
  points: number;
};

export type AnswersData = {
  answers: string[];
  correctAnswer: string;
};

export type PlayerData = {
  name: string;
  score: number;
  plusPoints: number;
  streak: number;
};

export type Results = {
  correctAnswer: string;
  scores: PlayerData[];
};

export type SelectedAnswer = {
  index: number;
  answer: string;
  points: number;
};

export type SocketEvents = {
  [Events.Join]: (id: string) => void;
  [Events.Start]: (params: Start) => void;
  [Events.Wait]: (params: Wait) => void;
  [Events.Guess]: () => void;
  [Events.PlayerGuess]: (data: PlayerGuess) => void;
  [Events.Results]: (data: Results) => void;
  [Events.Players]: (data: string[]) => void;
  [Events.UpdateStages]: (stages: number) => void;
  [Events.Reset]: () => void;
};
