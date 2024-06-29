import { SpotifyToken } from './types';

export const getToken = async () => {
  try {
    const data: SpotifyToken = await (
      await fetch('https://accounts.spotify.com/api/token', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
        body: `grant_type=client_credentials&client_id=${process.env.SPOTIFY_CLIENT_ID}&client_secret=${process.env.SPOTIFY_CLIENT_SECRET}`,
      })
    ).json();

    return data.access_token;
  } catch {
    throw new Error('Failed to get Spotify token');
  }
};
