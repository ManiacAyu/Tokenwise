import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProtocolChart({ counts }) {
  const labels = Object.keys(counts || {});
  const values = Object.values(counts || {});
  console.log(labels)
  console.log(values)

  const colors = [
    'rgba(59, 130, 246, 0.8)',
    'rgba(251, 191, 36, 0.8)',
    'rgba(52, 211, 153, 0.8)',
    'rgba(167, 139, 250, 0.8)',
    'rgba(236, 72, 153, 0.8)',
    'rgba(244, 114, 182, 0.8)',
  ];
  const chartData = {
    labels,
    datasets: [{
      label: 'Protocol Usage',
      data: values,
      backgroundColor: labels.map((_, i) => colors[i % colors.length]),
      borderColor: labels.map((_, i) => colors[i % colors.length].replace('0.8', '1')),
      borderWidth: 1,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'rectRounded',
          color: 'rgba(255, 255, 255, 0.9)',
          font: {
            size: 13,
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#000',
        titleColor: '#fff',
        bodyColor: '#fff',
      },
    },
  };

  return (
    <div className="h-64">
      <Pie data={chartData} options={options} />
    </div>
  );
}

