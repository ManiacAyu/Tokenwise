import { Router } from 'express';
import { getTopHolders } from '../controllers/walletController.js';

const router = Router();

router.get('/top', getTopHolders); // GET /api/wallets/top

export default router;
