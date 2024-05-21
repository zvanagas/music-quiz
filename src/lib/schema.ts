import { pgTable, text } from 'drizzle-orm/pg-core';

export const config = pgTable('config', {
  name: text('name'),
  value: text('value'),
});
