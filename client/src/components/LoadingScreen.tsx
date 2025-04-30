'use client';

import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentTip, setCurrentTip] = useState(0);

  const tips = [
    "Analyzing your website's performance metrics...",
    "Evaluating user experience and conversion funnel...",
    "Checking Core Web Vitals and loading speeds...",
    "Identifying optimization opportunities...",
    "Preparing actionable recommendations...",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          onComplete();
          return 100;
        }
        return prev + 1;
      });
    }, 100);

    const tipTimer = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 2000);

    return () => {
      clearInterval(timer);
      clearInterval(tipTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gray-900/90 flex items-center justify-center z-50">
      <div className="w-full max-w-2xl mx-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-2xl">
          <div className="flex items-center justify-center mb-8">
            <div className="relative w-24 h-24">
              <svg className="animate-spin w-full h-full" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          </div>
          
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Analyzing Your Website
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {tips[currentTip]}
            </p>
          </div>

          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            {progress}% Complete
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
              >
                <div
                  className="h-full bg-blue-600 rounded-full animate-pulse"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    width: `${Math.random() * 100}%`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 