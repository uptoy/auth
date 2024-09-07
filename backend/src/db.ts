import Knex from 'knex';
import knexConfig from './knexfile';

const environment = process.env.NODE_ENV || 'development';
const configOptions = knexConfig[environment];

export const db = Knex(configOptions);
