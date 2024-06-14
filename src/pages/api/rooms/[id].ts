import { db } from '@/lib/db/drizzle';
import { rooms } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const roomId = req.query.id;
    if (!roomId) {
      res.status(400).end();
      return;
    }
    try {
      const room = (
        await db
          .select()
          .from(rooms)
          .where(eq(rooms.id, Number(roomId)))
      )[0];

      if (!room) {
        res.status(404).end();
        return;
      }

      res.status(200).end();
      return;
    } catch (e) {
      res.status(400).end();
      return;
    }
  }
}
