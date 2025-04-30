'use client';

interface USPProps {
  title: string;
  description: string;
  color: 'red' | 'blue' | 'green';
}

const USP = ({ title, description, color }: USPProps) => {
  const colorClasses = {
    red: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
  };

  const textColors = {
    red: 'text-red-600 dark:text-red-400',
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
  };

  return (
    <div className={`p-6 rounded-xl border ${colorClasses[color]} transition-all hover:shadow-lg`}>
      <h3 className={`text-xl font-semibold mb-3 ${textColors[color]}`}>{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

export default function USPs() {
  const usps = [
    {
      title: 'Performance Analysis',
      description: 'Get detailed insights on your website\'s performance on both mobile and desktop. Analyze loading speeds, Core Web Vitals, and other performance metrics.',
      color: 'red' as const,
    },
    {
      title: 'UX & Funnel Analysis',
      description: 'Evaluate your user experience and conversion funnel for optimization opportunities. Review navigation, CTA placement, trust signals, and checkout friction points.',
      color: 'blue' as const,
    },
    {
      title: 'Actionable Recommendations',
      description: 'Get prioritized recommendations to improve your conversion rates. Receive top quick wins and detailed recommendations for long-term improvements.',
      color: 'green' as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {usps.map((usp, index) => (
        <USP key={index} {...usp} />
      ))}
    </div>
  );
} 