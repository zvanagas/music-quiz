import { thresholdColors } from '@/config/threshold-colors';
import { AnswersData } from '@/types/events';
import { Song } from '@/types/song';

export const shuffle = (array: string[]): string[] => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export const loadSong = (path: string): Promise<HTMLAudioElement | null> =>
  new Promise((resolve) => {
    if (typeof Audio === 'undefined') {
      return resolve(null);
    }

    const audio = new Audio(path);
    audio.oncanplay = (e) => resolve(e.target as HTMLAudioElement);
  });

export const loadSongs = async (songs: Song[], stagesCount: number) => {
  let songsCopy = [...songs];
  const songList: HTMLAudioElement[] = [];
  const answers: AnswersData[] = [];
  const stages = [...Array(stagesCount).keys()];
  for (const _ of stages) {
    const randomSongIndex = Math.floor(Math.random() * songsCopy.length);
    const selectedSong = songsCopy[randomSongIndex];
    const loadedSong = await loadSong(selectedSong.url);
    const incorrectAnswers = songs
      .filter(({ key }) => key !== selectedSong.key)
      .map(({ answer }) => answer);
    const shuffledIncorrectAnswers = shuffle(incorrectAnswers).slice(0, 3);
    shuffledIncorrectAnswers.push(selectedSong.answer);
    const shuffledAnswers = shuffle(shuffledIncorrectAnswers);
    answers.push({
      answers: shuffledAnswers,
      correctAnswer: selectedSong.answer,
    });
    songsCopy = songsCopy.filter((_, i) => i !== randomSongIndex);

    if (loadedSong) {
      songList.push(loadedSong);
    }
  }

  return {
    answers,
    songList,
  };
};

export const getColorName = (charCode: number): string | undefined => {
  let colorCode;

  for (const [threshold, color] of thresholdColors) {
    if (charCode < threshold) {
      break;
    }

    colorCode = color;
  }

  return colorCode;
};
