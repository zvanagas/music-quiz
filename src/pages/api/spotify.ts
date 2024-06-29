import { getPlaylist } from '@/lib/spotify/playlist';
import { getToken } from '@/lib/spotify/token';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.query.id) {
    res.status(400).json({ error: 'Id is missing' });
    return;
  }

  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;

  try {
    const token = await getToken();
    const playlist = await getPlaylist(token, id);

    res.status(200).json(playlist);
  } catch (error) {
    res.status(500).json(error);
  }
}
