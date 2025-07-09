import { DataSource } from 'typeorm';
import { Wallet } from '../models/Wallet.js';
import { Transaction } from '../models/Transaction.js';

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: 'postgresql://neondb_owner:npg_kugCbfB0r6oE@ep-green-frog-a1f9j2xy-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
    synchronize: true,
    logging: false,
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
    entities: [Wallet, Transaction],
});
