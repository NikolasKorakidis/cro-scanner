import React from 'react';
import { motion } from 'framer-motion';
import { BehavioralChecks } from '../../types/audit';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface BehavioralAnalysisProps {
  checks: BehavioralChecks;
}

const BehavioralAnalysis: React.FC<BehavioralAnalysisProps> = ({ checks }) => {
  const items = [
    { name: 'Scarcity Triggers', value: checks.scarcityTriggers },
    { name: 'Social Proof', value: checks.socialProof },
    { name: 'Authority Indicators', value: checks.authorityIndicators },
    { name: 'Commitment Devices', value: checks.commitmentDevices },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 rounded-lg p-6 shadow-lg"
    >
      <h2 className="text-xl font-bold mb-4">Behavioral Analysis</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between p-4 bg-gray-700 rounded-lg"
          >
            <span>{item.name}</span>
            {item.value ? (
              <CheckCircleIcon className="h-6 w-6 text-green-500" />
            ) : (
              <XCircleIcon className="h-6 w-6 text-red-500" />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BehavioralAnalysis; 