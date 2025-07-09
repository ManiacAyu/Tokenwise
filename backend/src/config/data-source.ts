import { DataSource } from 'typeorm';
import { Wallet } from '../models/Wallet';
import { Transaction } from '../models/Transaction';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'ayush',
  database: 'tokenwise',
  synchronize: true,
  logging: false,
  entities: [Wallet, Transaction],
});
