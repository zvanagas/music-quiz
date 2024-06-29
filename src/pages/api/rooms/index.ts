import { db } from '@/lib/db/drizzle';
import { rooms } from '@/lib/db/schema';
import { subHours } from 'date-fns';
import { gt } from 'drizzle-orm';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const createdRooms = await db
      .select()
      .from(rooms)
      .where(gt(rooms.createdAt, subHours(new Date(), 1)));

    res.status(200).json(createdRooms);
    return;
  } else if (req.method === 'POST') {
    const body = JSON.parse(req.body);

    if (!body.name) {
      res.status(400).end();
      return;
    }

    const id = Math.floor(100000 + Math.random() * 900000);

    try {
      await db.insert(rooms).values({ id, userName: body.name });
      res.status(201).json({ id });
      return;
    } catch {
      res.status(400).end();
      return;
    }
  }

  res.status(405).end();
}
