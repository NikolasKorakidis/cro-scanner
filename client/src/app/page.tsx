'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import UrlInput from '@/components/UrlInput';
import USPs from '@/components/USPs';
import LoadingScreen from '@/components/LoadingScreen';
import AuditResults from '@/components/AuditResults';

const mockAuditData = {
  audit: "**Strategic Foundation**\n\n- Fogg Behavior Model: The website does a good job of providing motivation (high-quality nail polish, variety of colors, easy application), ability (simple purchase process, clear product information), and prompts (call-to-action buttons, promotional banners). However, there's room for improvement in the ability aspect by reducing page load time and simplifying the checkout process.\n- RICE prioritization: The biggest reach and impact would come from improving the page load time (LCP). This would also be a high confidence change with potentially high effort.\n- Hicks Law: The website does well in limiting decision complexity by providing a simple and straightforward product page. However, the checkout process could be simplified to reduce decision-making time.\n\n**Data Synthesis Requirements**\n\n1. Performance Diagnostics:\n   - LCP: The current LCP is 9.1s, which is significantly higher than the target of 2.5s. This could be causing a high bounce rate and should be a priority to fix.\n   - CLS: Not available.\n   - TTI: Not available.\n   - Memory Usage: Not available.\n\n2. Behavioral Economics Check:\n   - Scarcity triggers: The website could benefit from implementing scarcity triggers such as limited stock or time-limited offers.\n   - Social proof implementation: The website does well in providing customer reviews for social proof.\n   - Authority indicators: The website could benefit from showcasing any endorsements or partnerships with authoritative figures in the beauty industry.\n   - Commitment devices: The website could benefit from implementing commitment devices such as subscription services or loyalty programs.\n\n**Adaptive Output Structure**\n\nPerformance Impact Analysis:\n- The high LCP could be significantly impacting conversions. Reducing the LCP to the target of 2.5s could potentially increase conversions by 18%.\n\nUX Optimization Matrix:\n- Preloading the LCP image, removing duplicate JavaScript modules, minifying CSS, efficiently encoding images, and using video formats for animated content could all help improve the LCP and overall page performance.\n\nTechnical Enhancement Kit:\n- Implementing core web vitals optimization and progressive loading could help improve the LCP and overall page performance.\n\nUniversal Conversion Drivers:\n- Improving value communication, decision architecture, and friction audit could all help increase conversions.\n\nImplementation Roadmap:\n- The first 2 weeks should focus on improving the critical rendering path to reduce the LCP. The next 2 weeks should focus on optimizing the conversion flow to increase the conversion rate. The following 4 weeks should focus on improving retention systems to increase the revenue per visitor.\n\nBenchmarks:\n- Baymard Institute: Use their e-commerce usability research to improve the checkout process.\n- Nielsen Norman Group: Use their usability heuristics to improve the overall user experience.\n- Google HEART Framework: Use their user-centered metrics to measure the impact of UX improvements."
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState('');

  const handleUrlSubmit = async (url: string) => {
    setIsLoading(true);
    setError('');
    setShowResults(false);

    // Simulate API call with timeout
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
    }, 10000);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-16">
        {!showResults ? (
          <section className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
                CRO Scanner
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Analyze your website and get actionable insights to improve your conversion rates.
              </p>
              <div className="flex flex-col items-center gap-4">
                <UrlInput onSubmit={handleUrlSubmit} />
                {error && (
                  <div className="text-red-500">
                    {error}
                  </div>
                )}
              </div>
              <USPs />
            </div>
          </section>
        ) : (
          <section className="container mx-auto px-4 py-20">
            <AuditResults data={mockAuditData} />
          </section>
        )}
        {isLoading && <LoadingScreen onComplete={() => setShowResults(true)} />}
      </main>
    </>
  );
}
