import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface PerformanceMetricsProps {
  metrics: {
    lcp?: string | number;
    cls?: string | number;
    tti?: string | number;
    memoryUsage?: string | number;
  };
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ metrics }) => {
  const { theme } = useTheme();
  
  const formatMetric = (value: string | number | undefined): string => {
    if (value === undefined) return 'N/A';
    if (typeof value === 'number') return value.toFixed(2);
    return value;
  };

  const metricData = [
    { name: 'Largest Contentful Paint (LCP)', value: formatMetric(metrics.lcp), unit: 's', target: 2.5 },
    { name: 'Cumulative Layout Shift (CLS)', value: formatMetric(metrics.cls), unit: '', target: 0.1 },
    { name: 'Time to Interactive (TTI)', value: formatMetric(metrics.tti), unit: 's', target: 3.8 },
    { name: 'Memory Usage', value: formatMetric(metrics.memoryUsage), unit: 'MB', target: 100 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className={`rounded-lg p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow'}`}
    >
      <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
        Performance Metrics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metricData.map((metric, index) => (
          <div 
            key={index} 
            className={`rounded-lg p-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}
          >
            <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
              {metric.name}
            </h3>
            <div className="flex items-center justify-between">
              <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                {metric.value}{metric.unit}
              </span>
              {metric.value !== 'N/A' && (
                <span className={`text-sm ${
                  parseFloat(metric.value) <= metric.target 
                    ? theme === 'dark' ? 'text-green-400' : 'text-green-600'
                    : theme === 'dark' ? 'text-red-400' : 'text-red-600'
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