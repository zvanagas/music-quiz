import { Song } from '@/types/song';
import { SpotifyPlaylist, SpotifyPlaylistApi } from './types';

export const getPlaylist = async (
  token: string,
  id: string
): Promise<SpotifyPlaylist> => {
  try {
    const playlist: SpotifyPlaylistApi = await (
      await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
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

    return { name: playlist.name, images: playlist.images, songs };
  } catch {
    throw new Error('Failed to get playlist');
  }
};
