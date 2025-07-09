import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { Activity, BarChart3, PieChart } from 'lucide-react';

import { fetchTransactions } from '../src/services/api';

import BuySellChart from './components/BuySellChart';
import ExportCSVButton from './components/ExportCSVButton';
import ProtocolChart from './components/ProtocolChart';
import Summary from './components/Summary';
import TransactionTable from './components/TransactionTable';

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

export default function App() {
  const [txns, setTxns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const response = await fetchTransactions();
        setTxns(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getTransactions();
  }, []);

  // ✅ Derived values instead of keeping separate state
  const buys = txns.filter((t) => t.type === "buy").length;
  const sells = txns.filter((t) => t.type === "sell").length;

  const protocolCounts = {};
  txns.forEach((t) => {
    protocolCounts[t.protocol] = (protocolCounts[t.protocol] || 0) + 1;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-white text-xl">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-green-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
            TokenWise Dashboard
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Real-time cryptocurrency transaction analytics and wallet intelligence
          </p>
        </div>

        {/* Summary Cards */}
        <Summary buys={buys} sells={sells} />

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-500/20 p-2 rounded-lg">
                <BarChart3 className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Buy vs Sell Volume</h3>
            </div>
            <BuySellChart buys={buys} sells={sells} />
          </div>

          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-500/20 p-2 rounded-lg">
                <PieChart className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Protocol Distribution</h3>
            </div>
            <ProtocolChart counts={protocolCounts} />
          </div>
        </div>

        {/* CSV Export */}
        <div className="flex justify-center mb-8">
          <ExportCSVButton />
        </div>

        {/* Transactions Table */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-500/20 p-2 rounded-lg">
              <Activity className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Recent Transactions</h2>
          </div>
          <TransactionTable data={txns} />
        </div>
      </div>
    </div>
  );
}
