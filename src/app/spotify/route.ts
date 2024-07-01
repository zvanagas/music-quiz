import { getPlaylist } from '@/lib/spotify/playlist';
import { getToken } from '@/lib/spotify/token';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return new Response('Spotify ID is missing', { status: 400 });
  }

  try {
    const token = await getToken();
    const playlist = await getPlaylist(token, id);

    return Response.json(playlist);
  } catch {
    return new Response('Unexpected error!', { status: 500 });
  }
}
