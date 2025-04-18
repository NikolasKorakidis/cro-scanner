import React from 'react';
import { motion } from 'framer-motion';
import { MapIcon } from '@heroicons/react/24/outline';

interface ImplementationRoadmapProps {
  roadmap: string[];
}

const ImplementationRoadmap: React.FC<ImplementationRoadmapProps> = ({ roadmap }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 rounded-lg p-6 shadow-lg"
    >
      <div className="flex items-center space-x-2 mb-4">
        <MapIcon className="h-6 w-6 text-green-500" />
        <h2 className="text-xl font-bold">Implementation Roadmap</h2>
      </div>
      <div className="space-y-4">
        {roadmap.map((step, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-4 bg-gray-700 rounded-lg"
          >
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-500 text-white font-bold">
              {index + 1}
            </div>
            <span>{step}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ImplementationRoadmap; 