import React from 'react';
import { motion } from 'framer-motion';

interface ImplementationRoadmapProps {
  roadmap: string[];
}

const ImplementationRoadmap: React.FC<ImplementationRoadmapProps> = ({ roadmap }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-gray-800 rounded-lg p-6"
    >
      <h2 className="text-2xl font-bold mb-4">Implementation Roadmap</h2>
      <div className="space-y-4">
        {roadmap.map((phase, index) => (
          <div key={index} className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-start">
              <span className="text-blue-400 mr-2">{index + 1}.</span>
              <p className="text-gray-200">{phase}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ImplementationRoadmap; 