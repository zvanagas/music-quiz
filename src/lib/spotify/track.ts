import { SpotifyTrack, SpotifyTrackApi } from './types';

export const getTrack = async (
  token: string,
  id: string
): Promise<SpotifyTrack> => {
  try {
    const track: SpotifyTrackApi = await (
      await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).json();

    return { name: track.name, url: track.preview_url };
  } catch {
    throw new Error('Failed to get track');
  }
};
