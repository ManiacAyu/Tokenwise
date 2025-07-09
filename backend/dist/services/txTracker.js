import { Connection, PublicKey } from '@solana/web3.js';
import { AppDataSource } from '../config/data-source';
import { Transaction } from '../models/Transaction';
import { Wallet } from '../models/Wallet';
const connection = new Connection('https://api.mainnet-beta.solana.com');
const TOKEN_MINT = new PublicKey('9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump');
let lastSignature = null;
export const pollTransactions = async () => {
    const walletRepo = AppDataSource.getRepository(Wallet);
    const txRepo = AppDataSource.getRepository(Transaction);
    const topWallets = await walletRepo.find();
    const walletSet = new Set(topWallets.map(w => w.address));
    const signatures = await connection.getSignaturesForAddress(TOKEN_MINT, lastSignature ? { until: lastSignature } : undefined, 'confirmed');
    if (signatures.length === 0)
        return;
    for (const sig of signatures.reverse()) {
        const parsedTx = await connection.getParsedTransaction(sig.signature, 'confirmed');
        if (!parsedTx || !parsedTx.meta || !parsedTx.meta.postTokenBalances)
            continue;
        const preBalances = parsedTx.meta.preTokenBalances;
        const postBalances = parsedTx.meta.postTokenBalances;
        for (const post of postBalances) {
            const owner = post.owner;
            if (!walletSet.has(owner) || post.mint !== TOKEN_MINT.toBase58())
                continue;
            const pre = preBalances.find(b => b.owner === owner);
            const preAmt = pre ? parseFloat(pre.uiTokenAmount.amount) : 0;
            const postAmt = parseFloat(post.uiTokenAmount.amount);
            const delta = postAmt - preAmt;
            if (delta === 0)
                continue;
            const tx = txRepo.create({
                walletAddress: owner,
                amount: Math.abs(delta) / 10 ** 9,
                type: delta > 0 ? 'buy' : 'sell',
                protocol: inferProtocol(parsedTx.transaction.message.instructions)
            });
            await txRepo.save(tx);
        }
    }
    lastSignature = signatures[0]?.signature || lastSignature;
};
function inferProtocol(instructions) {
    for (const ix of instructions) {
        const progId = ix.programId?.toString?.() || ix.program;
        if (!progId)
            continue;
        if (progId.includes('Jup') || progId.toLowerCase().includes('jupiter'))
            return 'Jupiter';
        if (progId.toLowerCase().includes('raydium'))
            return 'Raydium';
        if (progId.toLowerCase().includes('orca'))
            return 'Orca';
    }
    return 'Unknown';
}
//# sourceMappingURL=txTracker.js.map