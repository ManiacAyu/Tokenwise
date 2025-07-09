import { Request, Response } from 'express';
import { fetchTopHolders } from '../services/walletService.js';

export const getTopHolders = async (_req: Request, res: Response) => {
  try {
    const holders = await fetchTopHolders();
    res.status(200).json(holders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch top holders' });
  }
};
