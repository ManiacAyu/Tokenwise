import express from 'express';
import cors from 'cors';
import walletRoutes from './routes/walletRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import exportRoutes from './routes/exportRoute.js';


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/wallets', walletRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/export', exportRoutes);

export default app;
