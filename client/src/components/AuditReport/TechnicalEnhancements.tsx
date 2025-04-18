import React from 'react';
import { motion } from 'framer-motion';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';

interface TechnicalEnhancementsProps {
  enhancements: string[];
}

const TechnicalEnhancements: React.FC<TechnicalEnhancementsProps> = ({ enhancements }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 rounded-lg p-6 shadow-lg"
    >
      <div className="flex items-center space-x-2 mb-4">
        <WrenchScrewdriverIcon className="h-6 w-6 text-blue-500" />
        <h2 className="text-xl font-bold">Technical Enhancements</h2>
      </div>
      <div className="space-y-3">
        {enhancements.map((enhancement, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-4 bg-gray-700 rounded-lg"
          >
            <span className="text-blue-500 font-bold">{index + 1}.</span>
            <span>{enhancement}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default TechnicalEnhancements; 