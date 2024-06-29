import { Song } from '@/types/song';

type ItemArtist = {
  name: string;
};

type Track = {
  artists: ItemArtist[];
  name: string;
  preview_url: string | null;
};

type TracksItem = {
  track: Track;
};

type Tracks = {
  items: TracksItem[];
};

type Image = {
  url: string;
  width: number;
  height: number;
};

export type SpotifyPlaylistApi = {
  name: string;
  images: Image[];
  tracks: Tracks;
};

export type SpotifyToken = {
  access_token: string;
};

export type SpotifyPlaylist = {
  name: string;
  images: Image[];
  songs: Song[];
};
