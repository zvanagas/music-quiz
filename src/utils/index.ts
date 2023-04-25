import thresholdColors from '@/config/threshold-colors';

export const shuffle = (array: string[]): string[] => {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
};

export const loadSong = (path: string): Promise<HTMLAudioElement | null> => new Promise((resolve) => {
  if (typeof Audio === 'undefined') {
    return resolve(null);
  }

  const audio = new Audio(`${process.env.BASE_URL}/mp3/${path}`);
  audio.oncanplay = (e) => resolve(e.target as HTMLAudioElement);
});

export const getColorName = (charCode: number): string | undefined => {
  let colorCode;

  for (const [threshold, color] of thresholdColors) {
    if (charCode < threshold) {
      break;
    }

    colorCode = color;
  }

  return colorCode;
}
