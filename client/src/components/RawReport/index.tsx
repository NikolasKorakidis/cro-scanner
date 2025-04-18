import React from 'react';
import ReactMarkdown from 'react-markdown';

interface RawReportProps {
  content: string;
}

const RawReport: React.FC<RawReportProps> = ({ content }) => {
  return (
    <div className="mt-8 bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Raw Audit Report</h2>
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default RawReport; 