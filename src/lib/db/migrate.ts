import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db } from './drizzle';

import { config } from 'dotenv';

config({ path: '.env' });

const main = async () => {
  await migrate(db, { migrationsFolder: './src/lib/db/migrations' });
};

main();
