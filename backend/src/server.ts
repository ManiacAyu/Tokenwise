import "reflect-metadata";
import { AppDataSource } from "./config/data-source.js";
import app from "./app.js";
import { pollTransactions } from "./services/txTracker.js";
import { fetchTopHolders } from "./services/walletService.js"; // ✅ Import this

const PORT = process.env.PORT || 4000;

AppDataSource.initialize()
  .then(async () => {
    console.log("📦 Database connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });

    // ✅ Populate wallet table with top holders before polling
    const walletCount = await AppDataSource.getRepository("Wallet").count();
    if (walletCount === 0) {
      console.log("🔍 Fetching top holders for first time...");
      await fetchTopHolders();
    } else {
      console.log("✅ Wallets already loaded, skipping fetch.");
    }

    // ✅ Start polling transactions after DB and wallets are ready
    setInterval(() => {
      pollTransactions().catch(console.error);
    }, 60000);
  })
  .catch((err) => {
    console.error("❌ Error during DB initialization:", err);
  });
