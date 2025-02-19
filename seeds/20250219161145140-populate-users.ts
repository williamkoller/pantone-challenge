import users from './data/user';
import { Migration } from './umzugClient';

const tableName = 'users';
const batchSize = 100;
export const up: Migration = async ({ context: queryInterface }) => {
  for (let i = 0; i < users.length; i += batchSize) {
    const batch = users.slice(i, i + batchSize);
    await queryInterface.bulkInsert(tableName, batch);
  }
};

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.bulkDelete(tableName, {});
};
