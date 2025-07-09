import { Connection, PublicKey } from "@solana/web3.js";
import { AppDataSource } from "../config/data-source";
import { Transaction } from "../models/Transaction";
import { Wallet } from "../models/Wallet";

const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=7f216b11-a3a3-4ce3-8152-926e7c645372");
const TOKEN_MINT = new PublicKey("9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump");

let lastSignature: string | null = null;

export const pollTransactions = async () => {
  const walletRepo = AppDataSource.getRepository(Wallet);
  const txRepo = AppDataSource.getRepository(Transaction);

  const topWallets = await walletRepo.find();
  const walletSet = new Set(topWallets.map((w) => w.address));


  const signatures = await connection.getSignaturesForAddress(
    TOKEN_MINT,
    lastSignature ? { until: lastSignature, limit: 10 } : { limit: 10 },
    "confirmed"
  );

  if (signatures.length === 0) return;
  

  for (const sig of signatures.reverse()) {
    const existingTx = await txRepo.findOneBy({ signature: sig.signature });
    if (existingTx) {
    
      continue;
    }

    const parsedTx = await retryWithBackoff(() =>
      connection.getParsedTransaction(sig.signature, {
        commitment: "confirmed",
        maxSupportedTransactionVersion: 0,
      })
    );

    if (!parsedTx || !parsedTx.meta || !parsedTx.meta.postTokenBalances) continue;



    const preBalances = parsedTx.meta.preTokenBalances;
    const postBalances = parsedTx.meta.postTokenBalances;

    for (const post of postBalances) {
      console.log(post)
      const owner = post.owner?post.owner : "Ayush";
      if (!walletSet.has(owner) || post.mint !== TOKEN_MINT.toBase58()) continue;

      

      const pre = preBalances?.find((b) => b.owner === owner);
      const preAmt = pre ? parseFloat(pre.uiTokenAmount.amount) : 0;
      const postAmt = parseFloat(post.uiTokenAmount.amount);
      const delta = postAmt - preAmt;

      if (delta === 0) continue;


      const tx = txRepo.create({
        walletAddress: owner,
        amount: Math.abs(delta) / 10 ** 9,
        type: delta > 0 ? "buy" : "sell",
        protocol: inferProtocol(parsedTx.transaction.message.instructions),
        signature: sig.signature, // 🆕 Add signature here
      });

      

      try {
        await txRepo.save(tx);
      } catch (err: any) {
        if (err?.code === '23505') {
          console.warn(`🔁 Duplicate key on save: ${sig.signature}`);
        } else {
          throw err;
        }
      }
    }
  }

  lastSignature = signatures[signatures.length - 1]?.signature || lastSignature;
};

function inferProtocol(instructions: any[]): string {
  for (const ix of instructions) {
    const progId = ix.programId?.toString?.() || ix.program;
    if (!progId) continue;
    if (progId.includes("Jup") || progId.toLowerCase().includes("jupiter"))
      return "Jupiter";
    if (progId.toLowerCase().includes("raydium")) return "Raydium";
    if (progId.toLowerCase().includes("orca")) return "Orca";
    else return progId;
  }
  return "Unknown";
}

// ✅ Retry wrapper with exponential backoff
async function retryWithBackoff<T>(fn: () => Promise<T>, maxRetries = 5): Promise<T> {
  let delay = 500;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (err: any) {
      if (err?.message?.includes("429")) {
        console.warn(`🔁 429 Too Many Requests. Retrying after ${delay}ms`);
        await new Promise((res) => setTimeout(res, delay));
        delay *= 2;
      } else {
        throw err;
      }
    }
  }
  throw new Error("❌ Max retries exceeded due to 429 errors");
}
