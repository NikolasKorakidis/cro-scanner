'use client';

interface AuditResultsProps {
  data: {
    audit: string;
  };
}

export default function AuditResults({ data }: AuditResultsProps) {
  const sections = data.audit.split('\n\n').filter(Boolean);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {sections.map((section, index) => {
        const [title, ...content] = section.split('\n');
        const isBoldTitle = title.startsWith('**') && title.endsWith('**');
        const cleanTitle = isBoldTitle ? title.slice(2, -2) : title;

        return (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {cleanTitle}
            </h2>
            <div className="space-y-4">
              {content.map((line, lineIndex) => {
                if (line.startsWith('- ')) {
                  return (
                    <div key={lineIndex} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <p className="text-gray-700 dark:text-gray-300">{line.slice(2)}</p>
                    </div>
                  );
                }
                if (line.match(/^\d+\./)) {
                  return (
                    <div key={lineIndex} className="flex items-start">
                      <span className="text-blue-500 mr-2">{line.split('.')[0]}.</span>
                      <p className="text-gray-700 dark:text-gray-300">{line.split('.').slice(1).join('.')}</p>
                    </div>
                  );
                }
                return (
                  <p key={lineIndex} className="text-gray-700 dark:text-gray-300">
                    {line}
                  </p>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
} 