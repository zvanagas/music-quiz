import { eq } from 'drizzle-orm';
import { db } from '../drizzle';
import { config } from '../schema';

export const getStagesCount = async () => {
  const [stagesCount] = await db
    .select()
    .from(config)
    .where(eq(config.name, 'stages'))
    .limit(1);

  return Number(stagesCount.value);
};

export const updateStagesCount = (stages?: string) => {
  if (!stages) {
    throw new Error('Stages count is missing!');
  }

  return db
    .update(config)
    .set({ value: stages })
    .where(eq(config.name, 'stages'));
};
