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

export type SpotifyPlaylist = {
  tracks: Tracks;
};

export type SpotifyToken = {
  access_token: string;
};
