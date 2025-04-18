import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

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
  // Performance metrics data
  const performanceData = [
    {
      name: 'LCP',
      value: parseFloat(performanceMetrics.lcp),
      benchmark: 2.5,
    },
    {
      name: 'CLS',
      value: parseFloat(performanceMetrics.cls),
      benchmark: 0.1,
    },
    {
      name: 'TTI',
      value: parseFloat(performanceMetrics.tti),
      benchmark: 3.2,
    },
    {
      name: 'Memory',
      value: parseFloat(performanceMetrics.memoryUsage),
      benchmark: 45,
    },
  ];

  // Behavioral checks data
  const behavioralData = [
    { name: 'Scarcity Triggers', value: behavioralChecks.scarcityTriggers ? 1 : 0 },
    { name: 'Social Proof', value: behavioralChecks.socialProof ? 1 : 0 },
    { name: 'Authority Indicators', value: behavioralChecks.authorityIndicators ? 1 : 0 },
    { name: 'Commitment Devices', value: behavioralChecks.commitmentDevices ? 1 : 0 },
  ];

  // Benchmark data
  const benchmarkData = benchmarks.map(benchmark => {
    const [metric, value] = benchmark.split(': ');
    return {
      name: metric,
      value: parseFloat(value.replace(/[^0-9.]/g, '')),
    };
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Performance Metrics Bar Chart */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Performance Metrics vs Benchmarks</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" name="Current" />
            <Bar dataKey="benchmark" fill="#82ca9d" name="Benchmark" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Behavioral Checks Pie Chart */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Behavioral Elements Implementation</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={behavioralData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, value }) => `${name}: ${value ? 'Implemented' : 'Missing'}`}
            >
              {behavioralData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.value ? COLORS[index % COLORS.length] : '#FF0000'} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Benchmarks Radar Chart */}
      <div className="bg-gray-800 p-6 rounded-lg md:col-span-2">
        <h3 className="text-xl font-bold mb-4">Industry Benchmarks</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={benchmarkData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis />
            <Radar
              name="Benchmarks"
              dataKey="value"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts; 