import 'reflect-metadata';
import { AppDataSource } from './config/data-source.js';
import app from './app.js';
import { pollTransactions } from './services/txTracker.js';
const PORT = process.env.PORT || 4000;
AppDataSource.initialize().then(() => {
    console.log('📦 Database connected');
    app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
}).catch((err) => {
    console.error('❌ Error during DB initialization:', err);
});
setInterval(() => {
    pollTransactions().catch(console.error);
}, 10_000); // every 10 seconds
//# sourceMappingURL=server.js.map