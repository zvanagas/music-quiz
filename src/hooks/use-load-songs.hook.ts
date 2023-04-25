import { STAGES } from '@/config/constants';
import songs from '@/config/songs';
import { AnswersData } from '@/interfaces/events';
import { loadSong, shuffle } from '@/utils';
import { useCallback } from 'react';

const useLoadSongs = () => {
  const load = useCallback(async (category: string) => {
    const filteredSongs = category === 'all' ? songs : songs.filter(({ tag }) => category === tag);
    let songsCopy = [...filteredSongs];
    const songList: HTMLAudioElement[] = [];
    const answers: AnswersData[] = [];
    const stages = [...Array(STAGES).keys()];
    for (const _ of stages) {
      const randomSongIndex = Math.floor(Math.random() * songsCopy.length);
      const selectedSong = songsCopy[randomSongIndex];
      const loadedSong = await loadSong(selectedSong.url);
      const incorrectAnswers = filteredSongs
        .filter((it) => it.key !== selectedSong.key)
        .map((it) => it.answer);
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
    }
  }, []);

  return {
    load,
  };
};

export default useLoadSongs;
