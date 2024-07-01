import { db } from '@/lib/db/drizzle';
import { rooms } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

type Params = {
  id: string;
};

export async function GET(_: Request, context: { params: Params }) {
  const roomId = context.params.id;
  if (!roomId) {
    return new Response('Room ID not found!', { status: 400 });
  }
  try {
    const room = (
      await db
        .select()
        .from(rooms)
        .where(eq(rooms.id, Number(roomId)))
    )[0];

    if (!room) {
      return new Response('Room not found!', { status: 404 });
    }

    return Response.json(null);
  } catch (e) {
    return new Response('Unexpected error!', { status: 400 });
  }
}
