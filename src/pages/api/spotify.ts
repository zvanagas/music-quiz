import { Song } from '@/types/song';
import { SpotifyPlaylist, SpotifyToken } from '@/types/spotify';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.query.id) {
    res.status(400).json({ error: 'Id is missing' });
    return;
  }

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

    const playlist: SpotifyPlaylist = await (
      await fetch(`https://api.spotify.com/v1/playlists/${req.query.id}`, {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      })
    ).json();

    const songs: Song[] = playlist.tracks.items
      .filter(({ track }) => track.preview_url)
      .map(({ track }) => {
        const name = `${track.artists.map(({ name }) => name).join(', ')} - ${
          track.name
        }`;

        return {
          key: name,
          url: track.preview_url ?? '',
          answer: name,
          tag: 'spotify',
        };
      });

    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json(error);
  }
}
