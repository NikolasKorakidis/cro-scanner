'use client';

interface AuditReportProps {
  data: {
    audit: string;
  };
}

export default function AuditReport({ data }: AuditReportProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Audit Report</h2>
      <pre className="whitespace-pre-wrap text-gray-600 dark:text-gray-300">
        {data.audit}
      </pre>
    </div>
  );
} 