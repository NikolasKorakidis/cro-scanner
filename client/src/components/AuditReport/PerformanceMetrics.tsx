import React from 'react';
import { motion } from 'framer-motion';
import { PerformanceMetrics as PerformanceMetricsType } from '../../types/audit';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface PerformanceMetricsProps {
  metrics: PerformanceMetricsType;
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ metrics }) => {
  const data = {
    labels: ['LCP', 'CLS', 'TTI', 'Memory Usage'],
    datasets: [
      {
        label: 'Current Value',
        data: [
          parseFloat(metrics.lcp),
          metrics.cls ? parseFloat(metrics.cls) : 0,
          metrics.tti ? parseFloat(metrics.tti) : 0,
          metrics.memoryUsage ? parseFloat(metrics.memoryUsage) : 0,
        ],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
      {
        label: 'Target',
        data: [2.5, 0.1, 3.8, 0],
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Performance Metrics',
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 rounded-lg p-6 shadow-lg"
    >
      <h2 className="text-xl font-bold mb-4">Performance Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Largest Contentful Paint (LCP):</span>
            <span className={parseFloat(metrics.lcp) > 2.5 ? 'text-red-500' : 'text-green-500'}>
              {metrics.lcp}s
            </span>
          </div>
          <div className="flex justify-between">
            <span>Cumulative Layout Shift (CLS):</span>
            <span className={metrics.cls && parseFloat(metrics.cls) > 0.1 ? 'text-red-500' : 'text-green-500'}>
              {metrics.cls || 'N/A'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Time to Interactive (TTI):</span>
            <span className={metrics.tti && parseFloat(metrics.tti) > 3.8 ? 'text-red-500' : 'text-green-500'}>
              {metrics.tti || 'N/A'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Memory Usage:</span>
            <span>{metrics.memoryUsage || 'N/A'}</span>
          </div>
        </div>
        <div className="h-64">
          <Bar data={data} options={options} />
        </div>
      </div>
    </motion.div>
  );
};

export default PerformanceMetrics; 