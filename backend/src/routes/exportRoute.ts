// src/routes/exportRoutes.ts
import { Router } from 'express';
import { exportCSV } from '../controllers/exportController.js';

const router = Router();

router.get('/csv', exportCSV);

export default router;
