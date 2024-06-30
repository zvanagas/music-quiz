import { createRoom, getActiveRooms } from '@/lib/db/rooms';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const activeRooms = await getActiveRooms();

    res.status(200).json(activeRooms);
    return;
  } else if (req.method === 'POST') {
    const body = JSON.parse(req.body);

    try {
      const id = await createRoom(body);

      res.status(201).json({ id });
      return;
    } catch {
      res.status(400).end();
      return;
    }
  }

  res.status(405).end();
}
