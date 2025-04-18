import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header/index';
import UrlInput from './components/UrlInput';
import AuditReport from './components/AuditReport';
import Charts from './components/Charts';
import RawReport from './components/RawReport';
import { AuditReport as AuditReportType } from './types/audit';
import { ThemeProvider } from './context/ThemeContext';

// Mock data
const mockData: AuditReportType = {
  strategicFoundation: `# Strategic Foundation

## Overview
This audit provides a comprehensive analysis of your website's conversion rate optimization (CRO) potential, focusing on key areas that impact user behavior and conversion rates.

## Key Findings
- Strong technical foundation with room for optimization
- Good user experience but opportunities for improvement
- Clear conversion paths but could be enhanced
- Mobile responsiveness needs attention
- Content strategy aligned with business goals`,
  performanceMetrics: {
    lcp: "2.1",
    cls: "0.05",
    tti: "3.2",
    memoryUsage: "85"
  },
  behavioralChecks: {
    scarcityTriggers: true,
    socialProof: true,
    authorityIndicators: false,
    commitmentDevices: true
  },
  technicalEnhancements: [
    "Implement lazy loading for images",
    "Optimize CSS delivery",
    "Minify JavaScript files",
    "Enable browser caching"
  ],
  implementationRoadmap: [
    "Week 1: Performance optimization",
    "Week 2: UX improvements",
    "Week 3: A/B testing setup",
    "Week 4: Conversion path optimization"
  ],
  universalConversionDrivers: [
    "Clear value proposition",
    "Trust signals",
    "Social proof",
    "Urgency elements"
  ],
  benchmarks: [
    "Page load time: 2.1s (target: <2.5s)",
    "Conversion rate: 2.3% (industry avg: 2.5%)",
    "Bounce rate: 45% (target: <40%)",
    "Average session duration: 2m 15s"
  ]
};

const AppContent: React.FC = () => {
  const [data, setData] = useState<AuditReportType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateReport = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setData(mockData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <UrlInput onSubmit={handleGenerateReport} loading={loading} />
        </motion.div>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {data && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Charts
              performanceMetrics={data.performanceMetrics}
              benchmarks={data.benchmarks}
              behavioralChecks={data.behavioralChecks}
            />
            <AuditReport data={data} />
            <RawReport content={data.strategicFoundation} />
          </motion.div>
        )}
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
