import React from 'react';
import { motion } from 'framer-motion';

interface PerformanceMetricsProps {
  metrics: {
    lcp?: string;
    cls?: string;
    tti?: string;
    memoryUsage?: string;
  };
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ metrics }) => {
  const metricData = [
    { name: 'Largest Contentful Paint (LCP)', value: metrics.lcp || 'N/A', unit: 's', target: 2.5 },
    { name: 'Cumulative Layout Shift (CLS)', value: metrics.cls || 'N/A', unit: '', target: 0.1 },
    { name: 'Time to Interactive (TTI)', value: metrics.tti || 'N/A', unit: 's', target: 3.8 },
    { name: 'Memory Usage', value: metrics.memoryUsage || 'N/A', unit: 'MB', target: 100 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-gray-800 rounded-lg p-6"
    >
      <h2 className="text-2xl font-bold mb-4">Performance Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metricData.map((metric, index) => (
          <div key={index} className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">{metric.name}</h3>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">
                {metric.value}{metric.unit}
              </span>
              {metric.value !== 'N/A' && (
                <span className={`text-sm ${
                  parseFloat(metric.value) <= metric.target ? 'text-green-400' : 'text-red-400'
                }`}>
                  Target: {metric.target}{metric.unit}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default PerformanceMetrics; 