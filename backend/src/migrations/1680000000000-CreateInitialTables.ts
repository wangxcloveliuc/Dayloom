import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInitialTables1680000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "user" (
        "id" varchar PRIMARY KEY,
        "email" varchar NOT NULL UNIQUE,
        "password" varchar NOT NULL,
        "createdAt" datetime,
        "selectedTheme" varchar
      );
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "theme" (
        "id" integer PRIMARY KEY AUTOINCREMENT,
        "name" varchar NOT NULL,
        "properties" text
      );
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "diary_entry" (
        "id" varchar PRIMARY KEY,
        "title" varchar NOT NULL,
        "content" text NOT NULL,
        "entryDate" datetime,
        "createdAt" datetime,
        "updatedAt" datetime,
        "userId" varchar,
        FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE
      );
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "media" (
        "id" varchar PRIMARY KEY,
        "type" varchar NOT NULL,
        "path" varchar NOT NULL,
        "mimetype" varchar NOT NULL,
        "uploadedAt" datetime,
        "entryId" varchar,
        FOREIGN KEY ("entryId") REFERENCES "diary_entry" ("id") ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "media";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "diary_entry";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "theme";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "user";`);
  }
}
