import express from 'express';
import walletRoutes from './routes/walletRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
const app = express();
app.use(express.json());
app.use('/api/wallets', walletRoutes);
app.use('/api/transactions', transactionRoutes);
export default app;
//# sourceMappingURL=app.js.map