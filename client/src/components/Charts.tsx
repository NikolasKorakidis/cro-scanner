'use client';

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface ChartsProps {
  data: {
    audit: string;
  };
}

export default function Charts({ data }: ChartsProps) {
  const performanceChartRef = useRef<HTMLCanvasElement>(null);
  const conversionChartRef = useRef<HTMLCanvasElement>(null);
  const performanceChartInstance = useRef<Chart | null>(null);
  const conversionChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    // Cleanup previous charts
    if (performanceChartInstance.current) {
      performanceChartInstance.current.destroy();
    }
    if (conversionChartInstance.current) {
      conversionChartInstance.current.destroy();
    }

    if (!performanceChartRef.current || !conversionChartRef.current) return;

    // Extract LCP data from the report
    const lcpMatch = data.audit.match(/LCP: The current LCP is (\d+\.\d+)s/);
    const currentLCP = lcpMatch ? parseFloat(lcpMatch[1]) : 0;
    const targetLCP = 2.5;

    // Extract conversion impact data
    const conversionMatch = data.audit.match(/potentially increase conversions by (\d+)%/);
    const conversionIncrease = conversionMatch ? parseInt(conversionMatch[1]) : 0;

    // Performance Chart
    performanceChartInstance.current = new Chart(performanceChartRef.current, {
      type: 'bar',
      data: {
        labels: ['Current LCP', 'Target LCP'],
        datasets: [{
          label: 'Largest Contentful Paint (seconds)',
          data: [currentLCP, targetLCP],
          backgroundColor: ['#ef4444', '#22c55e'],
          borderColor: ['#dc2626', '#16a34a'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Performance Metrics',
            font: {
              size: 16,
              weight: 'bold'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Seconds'
            }
          }
        }
      }
    });

    // Conversion Impact Chart
    conversionChartInstance.current = new Chart(conversionChartRef.current, {
      type: 'doughnut',
      data: {
        labels: ['Current Conversion', 'Potential Increase'],
        datasets: [{
          data: [100, conversionIncrease],
          backgroundColor: ['#3b82f6', '#22c55e'],
          borderColor: ['#2563eb', '#16a34a'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Conversion Impact',
            font: {
              size: 16,
              weight: 'bold'
            }
          }
        }
      }
    });

    // Cleanup function
    return () => {
      if (performanceChartInstance.current) {
        performanceChartInstance.current.destroy();
      }
      if (conversionChartInstance.current) {
        conversionChartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Performance Visualization</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-[400px]">
            <canvas ref={performanceChartRef} />
          </div>
          <div className="h-[400px]">
            <canvas ref={conversionChartRef} />
          </div>
        </div>
      </div>
    </div>
  );
} 