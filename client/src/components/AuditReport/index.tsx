import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { PDFExport } from '@progress/kendo-react-pdf';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import ReactMarkdown from 'react-markdown';
import PerformanceMetrics from '../PerformanceMetrics';
import BehavioralAnalysis from '../BehavioralAnalysis';
import TechnicalEnhancements from '../TechnicalEnhancements';
import ImplementationRoadmap from '../ImplementationRoadmap';
import UniversalConversionDrivers from '../UniversalConversionDrivers';
import Benchmarks from '../Benchmarks';
import { AuditReport as AuditReportType } from '../../types/audit';
import { useTheme } from '../../context/ThemeContext';

interface AuditReportProps {
  data: AuditReportType;
}

const AuditReport: React.FC<AuditReportProps> = ({ data }) => {
  const pdfRef = useRef<PDFExport>(null);
  const { theme } = useTheme();

  const handleExportPDF = () => {
    if (pdfRef.current) {
      pdfRef.current.save();
    }
  };

  return (
    <div className={`space-y-8 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
      <div className="flex justify-end mb-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleExportPDF}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
          } text-white transition-colors`}
        >
          <DocumentArrowDownIcon className="w-5 h-5" />
          <span>Download PDF</span>
        </motion.button>
      </div>

      <PDFExport ref={pdfRef} paperSize="A4" fileName="website-audit-report.pdf">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow'}`}
          >
            <h2 className="text-2xl font-bold mb-4">Strategic Foundation</h2>
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown>{data.strategicFoundation}</ReactMarkdown>
            </div>
          </motion.div>

          <PerformanceMetrics metrics={data.performanceMetrics} />
          <BehavioralAnalysis checks={data.behavioralChecks} />
          <TechnicalEnhancements enhancements={data.technicalEnhancements} />
          <ImplementationRoadmap roadmap={data.implementationRoadmap} />
          <UniversalConversionDrivers drivers={data.universalConversionDrivers} />
          <Benchmarks benchmarks={data.benchmarks} />
        </div>
      </PDFExport>
    </div>
  );
};

export default AuditReport; 