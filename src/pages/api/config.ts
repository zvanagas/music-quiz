import { STAGES } from '@/config/constants';
import { db } from '@/lib/db/drizzle';
import { config } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    let stages = STAGES;
    try {
      const [stagesCount] = await db
        .select()
        .from(config)
        .where(eq(config.name, 'stages'))
        .limit(1);

      stages = Number(stagesCount.value);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(error);
    }

    res.status(200).json({
      stages,
    });
    return;
  } else if (req.method === 'PATCH') {
    const body = JSON.parse(req.body);

    if (!body.stages) {
      res.status(400).end();
      return;
    }

    try {
      await db
        .update(config)
        .set({ value: body.stages })
        .where(eq(config.name, 'stages'));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(error);
    }

    res.status(204).end();
    return;
  }

  res.status(405).end();
}
