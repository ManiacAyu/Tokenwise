import express from 'express';
import cors from 'cors';
import walletRoutes from './routes/walletRoutes';
import transactionRoutes from './routes/transactionRoutes';
import exportRoutes from './routes/exportRoute';


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/wallets', walletRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/export', exportRoutes);

export default app;
