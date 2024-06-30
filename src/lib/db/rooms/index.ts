import { gt } from 'drizzle-orm';
import { db } from '../drizzle';
import { rooms } from '../schema';
import { Room } from './types';
import { subHours } from 'date-fns';

export const getActiveRooms = (): Promise<Room[]> =>
  db
    .select()
    .from(rooms)
    .where(gt(rooms.createdAt, subHours(new Date(), 1)));

export const createRoom = async (data: { name?: string }): Promise<number> => {
  if (!data.name) {
    throw new Error('Name is missing!');
  }

  const id = Math.floor(100000 + Math.random() * 900000);

  await db.insert(rooms).values({ id, userName: data.name });

  return id;
};
