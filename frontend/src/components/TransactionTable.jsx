import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { TrendingUp, TrendingDown, Download, Wallet, Activity, BarChart3, PieChart, DollarSign } from 'lucide-react';

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

function TransactionTable({ data }) {
  return (
    <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table style={{ width: "100%" }} className="w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 border-b border-gray-600/50">
              <th className="text-left px-6 py-4 text-gray-200 font-semibold">Wallet</th>
              <th className="text-left px-6 py-4 text-gray-200 font-semibold">Type</th>
              <th className="text-left px-6 py-4 text-gray-200 font-semibold">Amount</th>
              <th className="text-left px-6 py-4 text-gray-200 font-semibold">Protocol</th>
              <th className="text-left px-6 py-4 text-gray-200 font-semibold">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {data.map((tx, index) => (
              <tr
                key={tx.id}
                className={`border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors duration-200 ${
                  index % 2 === 0 ? 'bg-gray-800/20' : 'bg-gray-900/20'
                }`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300 font-mono">
                      {tx.walletAddress.slice(0, 6)}...{tx.walletAddress.slice(-4)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      tx.type === 'buy'
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}
                  >
                    {tx.type.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-300 font-mono">
                  {parseFloat(tx.amount).toFixed(4)} ETH
                </td>
                <td className="px-6 py-4">
                  <span className="text-blue-400 bg-blue-500/20 px-2 py-1 rounded-lg text-sm">
                    {tx.protocol}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-400 text-sm">
                  {new Date(tx.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


export default TransactionTable;