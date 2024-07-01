import { createRoom, getActiveRooms } from '@/lib/db/rooms';

export async function GET() {
  const activeRooms = await getActiveRooms();

  return Response.json(activeRooms);
}

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const id = await createRoom(body.name);

    return Response.json({ id });
  } catch {
    return new Response('Unexpected error!', { status: 400 });
  }
}
