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

interface AuditReportProps {
  data: AuditReportType;
}

const AuditReport: React.FC<AuditReportProps> = ({ data }) => {
  const pdfRef = useRef<PDFExport>(null);

  const handleExportPDF = () => {
    if (pdfRef.current) {
      pdfRef.current.save();
    }
  };

  const parseMarkdownSection = (content: string, sectionTitle: string) => {
    const sectionRegex = new RegExp(`## ${sectionTitle}\\n\\n([\\s\\S]*?)(?=##|$)`);
    const match = content.match(sectionRegex);
    return match ? match[1].trim() : '';
  };

  const strategicFoundation = parseMarkdownSection(data.strategicFoundation, 'Strategic Foundation');
  const dataSynthesis = parseMarkdownSection(data.strategicFoundation, 'Data Synthesis Requirements');
  const adaptiveOutput = parseMarkdownSection(data.strategicFoundation, 'Adaptive Output Structure');

  return (
    <div className="mt-8">
      <div className="flex justify-end mb-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleExportPDF}
          className="flex items-center space-x-2 px-4 py-2 bg-green-500 rounded-lg text-white hover:bg-green-600"
        >
          <DocumentArrowDownIcon className="h-5 w-5" />
          <span>Download PDF</span>
        </motion.button>
      </div>

      <PDFExport ref={pdfRef} paperSize="A4" fileName="website-audit-report.pdf">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-4">Strategic Foundation</h2>
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown>{strategicFoundation}</ReactMarkdown>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800 rounded-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-4">Data Synthesis</h2>
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown>{dataSynthesis}</ReactMarkdown>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 rounded-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-4">Adaptive Output</h2>
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown>{adaptiveOutput}</ReactMarkdown>
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