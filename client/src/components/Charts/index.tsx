import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartsProps {
  performanceMetrics: {
    lcp: string;
    cls: string;
    tti: string;
    memoryUsage: string;
  };
  benchmarks: string[];
  behavioralChecks: {
    scarcityTriggers: boolean;
    socialProof: boolean;
    authorityIndicators: boolean;
    commitmentDevices: boolean;
  };
}

const Charts: React.FC<ChartsProps> = ({ performanceMetrics, benchmarks, behavioralChecks }) => {
  const performanceData = [
    { name: 'LCP', value: parseFloat(performanceMetrics.lcp) },
    { name: 'CLS', value: parseFloat(performanceMetrics.cls) },
    { name: 'TTI', value: parseFloat(performanceMetrics.tti) },
    { name: 'Memory', value: parseFloat(performanceMetrics.memoryUsage) },
  ];

  const behavioralData = [
    { name: 'Scarcity', value: behavioralChecks.scarcityTriggers ? 1 : 0 },
    { name: 'Social Proof', value: behavioralChecks.socialProof ? 1 : 0 },
    { name: 'Authority', value: behavioralChecks.authorityIndicators ? 1 : 0 },
    { name: 'Commitment', value: behavioralChecks.commitmentDevices ? 1 : 0 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Performance Metrics</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Behavioral Elements</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={behavioralData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Charts; 