import { getPlaylist } from '@/lib/spotify/playlist';
import { getToken } from '@/lib/spotify/token';
import { getTrack } from '@/lib/spotify/track';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const type = searchParams.get('type') ?? 'playlist';

  if (!id) {
    return new Response('Spotify ID is missing', { status: 400 });
  }

  if (!['playlist', 'track'].includes(type)) {
    return new Response('Incorrect type', { status: 400 });
  }

  try {
    const token = await getToken();

    if (type === 'playlist') {
      const playlist = await getPlaylist(token, id);

      return Response.json(playlist);
    }

    const track = await getTrack(token, id);

    return Response.json(track);
  } catch {
    return new Response('Unexpected error!', { status: 500 });
  }
}
