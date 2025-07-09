import { fetchTopHolders } from '../services/walletService.js';
export const getTopHolders = async (_req, res) => {
    try {
        const holders = await fetchTopHolders();
        res.status(200).json(holders);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch top holders' });
    }
};
//# sourceMappingURL=walletController.js.map