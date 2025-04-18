import React from 'react';
import { motion } from 'framer-motion';

interface BehavioralAnalysisProps {
  checks: {
    scarcityTriggers: boolean;
    socialProof: boolean;
    authorityIndicators: boolean;
    commitmentDevices: boolean;
  };
}

const BehavioralAnalysis: React.FC<BehavioralAnalysisProps> = ({ checks }) => {
  const checkData = [
    { name: 'Scarcity Triggers', value: checks.scarcityTriggers },
    { name: 'Social Proof', value: checks.socialProof },
    { name: 'Authority Indicators', value: checks.authorityIndicators },
    { name: 'Commitment Devices', value: checks.commitmentDevices },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-gray-800 rounded-lg p-6"
    >
      <h2 className="text-2xl font-bold mb-4">Behavioral Analysis</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {checkData.map((check, index) => (
          <div key={index} className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">{check.name}</h3>
            <div className="flex items-center">
              <span className={`text-sm ${
                check.value ? 'text-green-400' : 'text-red-400'
              }`}>
                {check.value ? 'Present' : 'Not Present'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BehavioralAnalysis; 