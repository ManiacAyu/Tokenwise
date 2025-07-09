import { AppDataSource } from '../config/data-source';
import { Transaction } from '../models/Transaction';
export const getTransactions = async (req, res) => {
    const txRepo = AppDataSource.getRepository(Transaction);
    const transactions = await txRepo.find({
        order: { timestamp: 'DESC' },
        take: 100, // limit to recent 100 for now
    });
    res.json(transactions);
};
//# sourceMappingURL=transactionController.js.map