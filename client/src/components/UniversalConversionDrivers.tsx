import React from 'react';
import { motion } from 'framer-motion';

interface UniversalConversionDriversProps {
  drivers: string[];
}

const UniversalConversionDrivers: React.FC<UniversalConversionDriversProps> = ({ drivers }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="bg-gray-800 rounded-lg p-6"
    >
      <h2 className="text-2xl font-bold mb-4">Universal Conversion Drivers</h2>
      <div className="space-y-4">
        {drivers.map((driver, index) => (
          <div key={index} className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              <p className="text-gray-200">{driver}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default UniversalConversionDrivers; 