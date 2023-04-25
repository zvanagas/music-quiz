import { Events } from '@/enums/events';

export interface Start {
  answers: AnswersData['answers'];
  stage: number;
  scores: PlayerData[];
}

export interface Wait {
  answers: AnswersData['answers'];
  correctAnswer: AnswersData['correctAnswer'];
  stage: number;
  scores: PlayerData[];
}

export interface PlayerGuess {
  index: number;
  answer: string;
  name: string;
  time: number;
}

export interface AnswersData {
  answers: string[];
  correctAnswer: string;
}

export interface PlayerData {
  name: string;
  score: number;
}

export interface Results {
  correctAnswer: string;
  scores: PlayerData[];
}

export interface SelectedAnswer {
  index: number;
  answer: string;
  time: number;
}

export interface SocketEvents {
  [Events.Join]: (id: string) => void;
  [Events.Start]: (params: Start) => void;
  [Events.Wait]: (params: Wait) => void;
  [Events.Guess]: () => void;
  [Events.PlayerGuess]: (data: PlayerGuess) => void;
  [Events.Results]: (data: Results) => void;
  [Events.Players]: (data: string[]) => void;
  [Events.Reset]: () => void;
}
