import { STAGES } from '@/config/constants';
import { db } from '@/lib/drizzle';
import { config } from '@/lib/schema';
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
      console.warn(error);
    }

    return res.status(200).json({
      stages,
    });
  }

  return res.status(405).end();
}
