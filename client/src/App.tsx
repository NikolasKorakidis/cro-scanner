import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import Header from './components/Header';
import UrlInput from './components/UrlInput';
import AuditReport from './components/AuditReport/index';
import Charts from './components/Charts';
import RawReport from './components/RawReport';
import { AuditData, AuditReport as AuditReportType } from './types/audit';

function App() {
  const [url, setUrl] = useState('');
  const [auditData, setAuditData] = useState<AuditReportType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rawReport, setRawReport] = useState<string>('');

  const handleGenerateReport = async () => {
    setLoading(true);
    setError(null);
    try {
      // Example API response
      const apiResponse = {
        "audit": `## Strategic Foundation

Applying the Fogg Behavior Model, the website has a clear prompt in the form of the "Find Jobs" button on the homepage. However, the motivation and ability factors could be improved. The website could benefit from more engaging content to increase user motivation. Additionally, the website's loading speed is quite slow, which could hinder the user's ability to interact with the site effectively.

Using the RICE prioritization, the website's loading speed should be addressed first due to its high reach and impact, and the confidence in the solution is high. The effort required is also relatively low compared to other potential improvements.

According to Hicks Law, the website could benefit from simplifying the decision-making process for users. For example, the job search function could be made more user-friendly by reducing the number of filters or by providing more intuitive filter options.

## Data Synthesis Requirements

1. Performance Diagnostics:
   - LCP: The current LCP is 6.6s, which is significantly higher than the target of 2.5s. This indicates that the website takes a long time to load, which could deter users from staying on the site.
   - CLS: Not available.
   - TTI: Not available.
   - Memory Usage: Not available.

2. Behavioral Economics Check:
   - Scarcity triggers: Not present.
   - Social proof implementation: Not present.
   - Authority indicators: Not present.
   - Commitment devices: Not present.

## Adaptive Output Structure

The website could benefit from several UX optimizations, such as removing duplicate modules in JavaScript bundles, using video formats for animated content, deferring offscreen images, and preloading the Largest Contentful Paint image. These changes could improve the website's loading speed and overall user experience.

## Technical Enhancement Kit

The website could implement core web vitals optimization and progressive loading to improve its performance.

## Universal Conversion Drivers

The website could improve its value communication by clarifying its value proposition and focusing on benefits in its microcopy. The decision architecture could be improved by optimizing the default options and reducing cognitive load. The website could also reduce friction by analyzing form fields and ensuring cross-device continuity.

## Implementation Roadmap

The implementation roadmap should focus on improving the critical rendering path in the first two weeks, improving the conversion flow in the next two weeks, and enhancing retention systems in the following four weeks.

## Benchmarks

The website could incorporate benchmarks from the Baymard Institute, Nielsen Norman Group, and Google HEART Framework to guide its optimization efforts.`
      };

      setRawReport(apiResponse.audit);

      // Example data structure combining API output with enhanced data
      const exampleData: AuditData = {
        strategicFoundation: {
          title: "Strategic Foundation",
          content: `## Strategic Foundation

### Overview
This comprehensive audit of your job search website reveals significant opportunities for performance optimization and conversion rate improvement. The analysis covers technical performance, user experience, and conversion optimization strategies.

### Key Findings
- Strong technical foundation with room for optimization
- Good user experience but opportunities for improvement
- Conversion rate optimization potential identified
- Mobile responsiveness needs attention
- Loading performance can be enhanced

### Fogg Behavior Model Analysis
- **Prompt**: Clear "Find Jobs" button on homepage
- **Motivation**: Could be improved with more engaging content
- **Ability**: Loading speed issues hinder user interaction
- **Recommendations**: 
  - Enhance content engagement
  - Optimize loading speed
  - Simplify user flows

### RICE Prioritization
1. Loading Speed Optimization
   - Reach: High (affects all users)
   - Impact: High (directly affects conversion)
   - Confidence: High (clear solution path)
   - Effort: Medium (technical implementation)

2. User Experience Enhancement
   - Reach: High (all users)
   - Impact: Medium (improves engagement)
   - Confidence: Medium (UX best practices)
   - Effort: Low (design changes)

3. Content Strategy
   - Reach: High (all users)
   - Impact: Medium (improves motivation)
   - Confidence: Medium (content best practices)
   - Effort: High (content creation)

## Data Synthesis Requirements

### Performance Metrics
- LCP (Largest Contentful Paint): 6.6s (Target: 2.5s)
- CLS (Cumulative Layout Shift): 0.1
- TTI (Time to Interactive): 3.2s
- Memory Usage: 45MB
- First Input Delay: 100ms
- Speed Index: 3.8s

### Behavioral Economics Analysis
- Scarcity triggers: Limited time offers, Countdown timers
- Social proof: Customer testimonials, Trust badges
- Authority indicators: Industry certifications, Expert endorsements
- Commitment devices: Free trial signups, Money-back guarantees

## Adaptive Output Structure

### Technical Recommendations
1. Implement lazy loading for images
2. Optimize JavaScript bundle size
3. Enable browser caching
4. Minify CSS and JavaScript files
5. Implement responsive images
6. Reduce server response time
7. Remove duplicate modules in JavaScript bundles
8. Use video formats for animated content
9. Defer offscreen images
10. Preload Largest Contentful Paint image

### Implementation Timeline
1. Week 1-2: Critical rendering path optimization
2. Week 3-4: Conversion flow improvement
3. Week 5-8: Retention systems enhancement
4. Week 9-12: Content strategy implementation

### Conversion Drivers
1. Clear value proposition
2. Trust indicators
3. Social proof
4. Urgency and scarcity
5. Simplified checkout process
6. Mobile optimization
7. Personalized recommendations
8. Exit-intent popups
9. Live chat support
10. Product videos

### Industry Benchmarks
- Average LCP: 2.5s
- Average CLS: 0.1
- Average TTI: 3.2s
- Average conversion rate: 2.5%
- Mobile conversion rate: 1.8%
- Cart abandonment rate: 68%
- Average order value: $85
- Bounce rate: 45%
- Pages per session: 3.2
- Average session duration: 2m 15s`
        },
        performanceMetrics: {
          lcp: 6.6,
          cls: 0.1,
          tti: 3.2,
          memoryUsage: 45
        },
        behavioralChecks: {
          scarcityTriggers: [
            "Limited time offers",
            "Countdown timers",
            "Stock level indicators",
            "Flash sales"
          ],
          urgencyTriggers: [
            "Flash sales",
            "Limited stock indicators",
            "Last chance offers",
            "Early bird discounts"
          ],
          socialProof: [
            "Customer testimonials",
            "Trust badges",
            "User reviews",
            "Social media shares",
            "Case studies"
          ]
        },
        technicalEnhancements: {
          recommendations: [
            "Implement lazy loading for images",
            "Optimize JavaScript bundle size",
            "Enable browser caching",
            "Minify CSS and JavaScript files",
            "Implement responsive images",
            "Reduce server response time",
            "Remove duplicate modules in JavaScript bundles",
            "Use video formats for animated content",
            "Defer offscreen images",
            "Preload Largest Contentful Paint image",
            "Implement core web vitals optimization",
            "Enable progressive loading",
            "Optimize critical rendering path",
            "Implement service workers",
            "Enable HTTP/2"
          ]
        },
        implementationRoadmap: {
          steps: [
            "Week 1-2: Critical rendering path optimization",
            "Week 3-4: Conversion flow improvement",
            "Week 5-8: Retention systems enhancement",
            "Week 9-12: Content strategy implementation",
            "Week 13-16: A/B testing implementation",
            "Week 17-20: Analytics setup",
            "Week 21-24: Final review and adjustments"
          ]
        },
        universalConversionDrivers: {
          drivers: [
            "Clear value proposition",
            "Trust indicators",
            "Social proof",
            "Urgency and scarcity",
            "Simplified checkout process",
            "Mobile optimization",
            "Personalized recommendations",
            "Exit-intent popups",
            "Live chat support",
            "Product videos",
            "Clarify value proposition",
            "Focus on benefits in microcopy",
            "Optimize default options",
            "Reduce cognitive load",
            "Analyze form fields",
            "Ensure cross-device continuity"
          ]
        },
        benchmarks: {
          metrics: [
            "Industry average LCP: 2.5s",
            "Industry average CLS: 0.1",
            "Industry average TTI: 3.2s",
            "Industry average conversion rate: 2.5%",
            "Mobile conversion rate: 1.8%",
            "Cart abandonment rate: 68%",
            "Average order value: $85",
            "Bounce rate: 45%",
            "Pages per session: 3.2",
            "Average session duration: 2m 15s"
          ]
        }
      };

      // Transform the data to match AuditReport interface
      const transformedData: AuditReportType = {
        strategicFoundation: exampleData.strategicFoundation.content,
        performanceMetrics: {
          lcp: exampleData.performanceMetrics.lcp.toString(),
          cls: exampleData.performanceMetrics.cls.toString(),
          tti: exampleData.performanceMetrics.tti.toString(),
          memoryUsage: exampleData.performanceMetrics.memoryUsage.toString(),
        },
        behavioralChecks: {
          scarcityTriggers: exampleData.behavioralChecks.scarcityTriggers.length > 0,
          socialProof: exampleData.behavioralChecks.socialProof.length > 0,
          authorityIndicators: true,
          commitmentDevices: true,
        },
        technicalEnhancements: exampleData.technicalEnhancements.recommendations,
        implementationRoadmap: exampleData.implementationRoadmap.steps,
        universalConversionDrivers: exampleData.universalConversionDrivers.drivers,
        benchmarks: exampleData.benchmarks.metrics,
      };

      console.log('Transformed data:', transformedData);
      setAuditData(transformedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <UrlInput onSubmit={handleGenerateReport} loading={loading} />
        </motion.div>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {auditData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Charts
              performanceMetrics={auditData.performanceMetrics}
              benchmarks={auditData.benchmarks}
              behavioralChecks={auditData.behavioralChecks}
            />
            <AuditReport data={auditData} />
            <RawReport content={rawReport} />
          </motion.div>
        )}
      </main>
    </div>
  );
}

export default App;
