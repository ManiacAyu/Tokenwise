import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source.js';
import { Transaction } from '../models/Transaction.js';

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const txRepo = AppDataSource.getRepository(Transaction);

    const transactions = await txRepo.find({
      order: { timestamp: 'DESC' },
      take: 100, // limit to recent 100
      select: ['walletAddress', 'amount', 'type', 'protocol', 'timestamp', 'signature'], // include signature
    });

    res.status(200).json(transactions);
  } catch (error) {
    console.error('❌ Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};
