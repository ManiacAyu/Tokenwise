import 'reflect-metadata';
import { AppDataSource } from './config/data-source.js';
import app from './app.js';
import { pollTransactions } from './services/txTracker.js';
import { fetchTopHolders } from './services/walletService.js'; // ✅ Import this

const PORT = process.env.PORT || 4000;

AppDataSource.initialize()
  .then(async () => {
    console.log('📦 Database connected'); 
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });

    // ✅ Populate wallet table with top holders before polling
    await fetchTopHolders();
    console.log("AAYA");

    

    // ✅ Start polling transactions after DB and wallets are ready
    setInterval(() => {
      pollTransactions().catch(console.error);
    }, 10000);
  })
  .catch((err) => {
    console.error('❌ Error during DB initialization:', err);
  });
