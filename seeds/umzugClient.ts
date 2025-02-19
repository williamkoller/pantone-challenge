import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';
import configuration from '../src/shared/config/configuration';
import * as dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(configuration().database);

export const umzug = new Umzug({
  migrations: { glob: `${process.cwd()}/seeds/*.ts` },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

export type Migration = typeof umzug._types.migration;
export { DataTypes } from 'sequelize';
