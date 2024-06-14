import { date, integer, pgTable, text } from 'drizzle-orm/pg-core';

export const config = pgTable('config', {
  name: text('name'),
  value: text('value'),
});

export const rooms = pgTable('rooms', {
  id: integer('id'),
  userName: text('userName'),
  createdAt: date('createdAt').defaultNow(),
});
