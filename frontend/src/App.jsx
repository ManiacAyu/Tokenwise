import { useEffect, useState } from "react";
import { fetchTransactions } from "./services/api";
import BuySellChart from "./components/BuySellChart";
import ProtocolChart from "./components/ProtocolChart";
import TransactionTable from "./components/TransactionTable";
import Summary from "./components/Summary";
import ExportCSVButton from "./components/ExportCSVButton";

function App() {
  const [txns, setTxns] = useState([]);

  useEffect(() => {
    fetchTransactions().then((res) => setTxns(res.data));
  }, []);

  const buys = txns.filter((t) => t.type === "buy").length;
  const sells = txns.filter((t) => t.type === "sell").length;

  const protocolCounts = {};
  txns.forEach((t) => {
    protocolCounts[t.protocol] = (protocolCounts[t.protocol] || 0) + 1;
  });

  return (
    <div style={{ padding: 20 }}>
      <h1>📊 TokenWise Dashboard</h1>
      <Summary buys={buys} sells={sells} />
      <div style={{ display: "flex", gap: "2rem" }}>
        <BuySellChart buys={buys} sells={sells} />
        <ProtocolChart counts={protocolCounts} />
      </div>
      <h2>Recent Transactions</h2>
      <TransactionTable data={txns} />

      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">
          📊 Wallet Intelligence Dashboard
        </h1>
        <ExportCSVButton />
      </div>
    </div>
  );
}

export default App;
