import { InferSelectModel } from 'drizzle-orm';
import { rooms } from '../schema';

export type Room = InferSelectModel<typeof rooms>;
