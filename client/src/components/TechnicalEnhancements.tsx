import React from 'react';
import { motion } from 'framer-motion';

interface TechnicalEnhancementsProps {
  enhancements: string[];
}

const TechnicalEnhancements: React.FC<TechnicalEnhancementsProps> = ({ enhancements }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-gray-800 rounded-lg p-6"
    >
      <h2 className="text-2xl font-bold mb-4">Technical Enhancements</h2>
      <div className="space-y-4">
        {enhancements.map((enhancement, index) => (
          <div key={index} className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-start">
              <span className="text-green-400 mr-2">•</span>
              <p className="text-gray-200">{enhancement}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default TechnicalEnhancements; 