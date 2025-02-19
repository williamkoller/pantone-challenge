#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';

interface SeedOptions {
  seedName: string;
}

function createSeedTemplate(options: SeedOptions): void {
  const { seedName } = options;
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '');

  const templateContent = `
import { Migration } from './umzugClient';

//Example

export const up: Migration = async ({ context: queryInterface }) => {
  // await queryInterface.bulkInsert('table_name', [
  //   {
  //     id: 1,
  //     name: 'Jon',
  //     surname: 'Doe',
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   },
  // ]);
};

export const down: Migration = async ({ context: queryInterface }) => {
  // await queryInterface.bulkDelete('table_name', {});
};
`.trim();

  const migrationFileName = `${timestamp}-${seedName}.ts`;
  const migrationsDirectory = path.join(process.cwd(), 'seeds');

  if (!fs.existsSync(migrationsDirectory)) {
    fs.mkdirSync(migrationsDirectory);
  }

  const migrationFilePath = path.join(migrationsDirectory, migrationFileName);

  fs.writeFileSync(migrationFilePath, templateContent);

  console.log(`Seed template created successfully at: ${migrationFilePath}`);
}

if (process.argv.length !== 3) {
  console.error('Usage: npm run seed:create <seedName>');
  process.exit(1);
}

const seedName = process.argv[2];

createSeedTemplate({ seedName });
