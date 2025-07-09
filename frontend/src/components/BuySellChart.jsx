import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale);

export default function BuySellChart({ buys, sells }) {
  const data = {
    labels: ['Buy', 'Sell'],
    datasets: [
      {
        label: 'Transactions',
        data: [buys, sells],
        backgroundColor: ['#4ade80', '#f87171'],
      },
    ],
  };

  return <Bar data={data} />;
}
