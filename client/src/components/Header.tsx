import React from 'react';
import { motion } from 'framer-motion';
import { ChartBarIcon } from '@heroicons/react/24/outline';

const Header = () => {
  return (
    <header className="bg-gray-900 shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-4"
        >
          <ChartBarIcon className="h-8 w-8 text-blue-500" />
          <h1 className="text-2xl font-bold text-white">CRO Scanner</h1>
        </motion.div>
      </div>
    </header>
  );
};

export default Header; 