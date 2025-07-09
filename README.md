
# 🧠 TokenWise — Real-Time Wallet Intelligence on Solana

TokenWise is a full-stack dashboard that tracks **top 60 holders** of a specific SPL token on the Solana blockchain, monitors their **buy/sell activity** in near real-time, and provides an exportable CSV of recent transactions.

---

## 🚀 Features

- Track top 60 holders of a specific SPL token
- Monitor real-time buy/sell transactions for tracked wallets
- Automatically detects protocols like Jupiter, Raydium, Orca
- CSV export functionality for analysis
- Hosted with:
  - 🧠 Frontend: Vercel
  - ⚙️ Backend: Render / Node.js + TypeORM
  - 🗃️ DB: PostgreSQL (NeonDB)

---

## 🧩 Tech Stack

- **Frontend:** React.js, Tailwind CSS, Axios
- **Backend:** Node.js, Express, TypeORM
- **Database:** PostgreSQL (Neon)
- **Blockchain:** Solana RPC (via Helius API)
- **CSV Export:** fast-csv

---

## 🛠️ Local Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/tokenwise.git
cd tokenwise
```

### 2. Backend Setup

```bash
cd backend
npm install
```

#### ➕ Environment Variables

Create a `.env` file inside `/backend`:

```env
PORT=4000
DATABASE_URL=your_neon_or_postgres_url
HELIUS_RPC=https://mainnet.helius-rpc.com/?api-key=your-api-key
```

> ✅ Uses TypeORM, so `synchronize: true` will auto-create tables.

### 3. Run Backend

```bash
npm run dev
```

> Automatically fetches top 60 holders and starts polling transactions every 60 seconds.

---

### 4. Frontend Setup

```bash
cd ../frontend
npm install
```

#### ➕ Environment Variables

Create a `.env` file in `/frontend`:

```env
VITE_API_BASE=https://your-backend-domain.com/api
```

### 5. Run Frontend

```bash
npm run dev
```

> App runs locally on `http://localhost:5173`.

---

## 📦 API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/wallets/top` | Get top 60 token holders |
| `GET /api/transactions` | Fetch recent transactions |
| `GET /api/export/csv` | Download CSV file of transactions |

---

## 🧪 Deployment

- **Frontend:** Push `/frontend` to Vercel
- **Backend:** Deploy `/backend` on Render using build command `npm install && npm run build`

---

## 🛠 Future Improvements

- Real-time updates via WebSocket
- Charts & wallet-level analytics
- Multi-token tracking
- Wallet profile view
- Authentication + alert subscriptions
