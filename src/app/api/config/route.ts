import { STAGES } from '@/config/constants';
import { getStagesCount, updateStagesCount } from '@/lib/db/config';

export async function GET() {
  let stages = STAGES;
  try {
    stages = await getStagesCount();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
  }

  return Response.json({ stages });
}

export async function PATCH(request: Request) {
  const body = await request.json();

  try {
    await updateStagesCount(body.stages);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
  }

  return new Response();
}
