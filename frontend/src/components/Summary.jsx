import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { TrendingUp, TrendingDown, Download, Wallet, Activity, BarChart3, PieChart, DollarSign } from 'lucide-react';

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

function Summary({ buys, sells }) {
  const net = buys - sells;
  const total = buys + sells;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-300 text-sm font-medium">Total Buys</p>
            <p className="text-3xl font-bold text-white">{buys}</p>
          </div>
          <div className="bg-green-500/20 p-3 rounded-full">
            <TrendingUp className="w-6 h-6 text-green-400" />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 backdrop-blur-sm border border-red-500/30 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-red-300 text-sm font-medium">Total Sells</p>
            <p className="text-3xl font-bold text-white">{sells}</p>
          </div>
          <div className="bg-red-500/20 p-3 rounded-full">
            <TrendingDown className="w-6 h-6 text-red-400" />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-300 text-sm font-medium">Net Direction</p>
            <p className="text-xl font-bold text-white">
              {net > 0 ? 'Buy Heavy 🟢' : net < 0 ? 'Sell Heavy 🔴' : 'Neutral ⚪'}
            </p>
          </div>
          <div className="bg-blue-500/20 p-3 rounded-full">
            <Activity className="w-6 h-6 text-blue-400" />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-300 text-sm font-medium">Total Volume</p>
            <p className="text-3xl font-bold text-white">{total}</p>
          </div>
          <div className="bg-purple-500/20 p-3 rounded-full">
            <DollarSign className="w-6 h-6 text-purple-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary;