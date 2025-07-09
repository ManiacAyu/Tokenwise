import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProtocolChart({ counts }) {
  const labels = Object.keys(counts);
  const data = Object.values(counts);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Protocol Usage',
        data,
        backgroundColor: ['#60a5fa', '#fbbf24', '#34d399', '#a78bfa'],
      },
    ],
  };

  return <Pie data={chartData} />;
}
