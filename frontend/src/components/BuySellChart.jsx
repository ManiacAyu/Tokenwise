import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { TrendingUp, TrendingDown, Download, Wallet, Activity, BarChart3, PieChart, DollarSign } from 'lucide-react';

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

// Mock data for demonstration
// const mockTransactions = [
//   { id: 1, walletAddress: '0x742d35Cc6634C0532925a3b8D494319A9b5f8e1A', type: 'buy', amount: '1.2345', protocol: 'Uniswap', timestamp: '2024-01-15T10:30:00Z' },
//   { id: 2, walletAddress: '0x8ba1f109551bD432803012645Houn2143D7F8273', type: 'sell', amount: '0.8765', protocol: 'SushiSwap', timestamp: '2024-01-15T11:45:00Z' },
//   { id: 3, walletAddress: '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa', type: 'buy', amount: '2.1234', protocol: 'PancakeSwap', timestamp: '2024-01-15T14:20:00Z' },
//   { id: 4, walletAddress: '0x267be1C1D684F78cb4F6a176C4911b741E4Ffdc0', type: 'sell', amount: '0.5432', protocol: 'Uniswap', timestamp: '2024-01-15T15:10:00Z' },
//   { id: 5, walletAddress: '0x6f46cf5569aefa1acc1009290c8e043747172d89', type: 'buy', amount: '3.4567', protocol: 'Curve', timestamp: '2024-01-15T16:30:00Z' },
// ];

function BuySellChart({ buys, sells }) {
  const data = {
    labels: ['Buy Orders', 'Sell Orders'],
    datasets: [
      {
        label: 'Transactions',
        data: [buys, sells],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(239, 68, 68, 1)'
        ],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
    },
  };

  return (
    <div className="h-64">
      <Bar data={data} options={options} />
    </div>
  );
}

export default BuySellChart;