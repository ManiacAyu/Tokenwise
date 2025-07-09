// src/controllers/exportController.ts
import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Transaction } from '../models/Transaction';
import { format } from 'date-fns';
import { writeToString } from 'fast-csv';

export const exportCSV = async (req: Request, res: Response) => {
  const txRepo = AppDataSource.getRepository(Transaction);

  const transactions = await txRepo.find({
    order: { timestamp: 'DESC' },
    take: 1000, // You can customize this number
  });

  const records = transactions.map((tx) => ({
    Wallet: tx.walletAddress,
    Type: tx.type,
    Amount: tx.amount,
    Protocol: tx.protocol,
    Timestamp: format(new Date(tx.timestamp), 'dd/MM/yyyy, HH:mm:ss'),
    Signature: (tx as any).signature || '',
  }));

  const csv = await writeToString(records, { headers: true });

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=transactions.csv');
  res.status(200).send(csv);
};
