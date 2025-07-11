import { Router } from 'express';
import { getTransactions } from '../controllers/transactionController.js';

const router = Router();

router.get('/', getTransactions); // GET /api/transactions

export default router;
