import { Connection, PublicKey } from '@solana/web3.js';
import { Wallet } from '../models/Wallet';
import { AppDataSource } from '../config/data-source';
import { TokenAccountBalancePair } from '../types/types';

const connection = new Connection('https://mainnet.helius-rpc.com/?api-key=7f216b11-a3a3-4ce3-8152-926e7c645372');
const TARGET_TOKEN = new PublicKey('9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump');

export const fetchTopHolders = async (): Promise<Wallet[]> => {
  const tokenAccounts = await connection.getProgramAccounts(
    new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
    {
      filters: [
        { dataSize: 165 },
        {
          memcmp: {
            offset: 0,
            bytes: TARGET_TOKEN.toBase58(),
          },
        },
      ],
    }
  );

  const wallets: TokenAccountBalancePair[] = [];

  for (const acc of tokenAccounts) {
    const owner = acc.account.data.slice(32, 64);
    const amount = acc.account.data.slice(64, 72);

    const ownerPubkey = new PublicKey(owner).toBase58();
    const rawAmount = Buffer.from(amount).readBigUInt64LE();
    const tokenAmount = Number(rawAmount) / 10 ** 9;

    if (tokenAmount > 0) {
      wallets.push({ address: ownerPubkey, tokenAmount });
    }
  }

  const top60 = wallets
    .sort((a, b) => b.tokenAmount - a.tokenAmount).slice(0, 60);

  // Save to DB and collect saved Wallet entities
  const walletRepo = AppDataSource.getRepository(Wallet);
  await walletRepo.clear(); // Optional: Clear previous data

  const savedWallets: Wallet[] = [];

  for (const w of top60) {
    const wallet = walletRepo.create({
      address: w.address,
      tokenAmount: w.tokenAmount,
    });
    const saved = await walletRepo.save(wallet);
    savedWallets.push(saved);
  }

  return savedWallets;
};
