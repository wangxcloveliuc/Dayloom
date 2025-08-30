import 'reflect-metadata';
import { AppDataSource } from './data-source';

async function run() {
  await AppDataSource.initialize();
  console.log('DataSource initialized');
  await AppDataSource.runMigrations();
  console.log('Migrations run');
  await AppDataSource.destroy();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
