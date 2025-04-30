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

  const lineChartRef = useRef<HTMLCanvasElement>(null);
  const radarChartRef = useRef<HTMLCanvasElement>(null);
  const polarAreaChartRef = useRef<HTMLCanvasElement>(null);
  const scatterChartRef = useRef<HTMLCanvasElement>(null);
  const bubbleChartRef = useRef<HTMLCanvasElement>(null);
  const pieChartRef = useRef<HTMLCanvasElement>(null);
  const horizontalBarChartRef = useRef<HTMLCanvasElement>(null);
  const stackedBarChartRef = useRef<HTMLCanvasElement>(null);
  const mixedChartRef = useRef<HTMLCanvasElement>(null);
  const areaChartRef = useRef<HTMLCanvasElement>(null);

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

    const chartInstances = [];

    const createChart = (ref, config) => {
      if (ref.current) {
        const chart = new Chart(ref.current, config);
        chartInstances.push(chart);
      }
    };

    createChart(lineChartRef, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [{
          label: 'Line Chart Example',
          data: [10, 20, 15, 25],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
        }],
      },
    });

    createChart(radarChartRef, {
      type: 'radar',
      data: {
        labels: ['Speed', 'Reliability', 'Ease of Use', 'Features'],
        datasets: [{
          label: 'Radar Chart Example',
          data: [80, 90, 70, 85],
          backgroundColor: 'rgba(34, 197, 94, 0.2)',
          borderColor: '#22c55e',
        }],
      },
    });

    createChart(polarAreaChartRef, {
      type: 'polarArea',
      data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
          data: [11, 16, 7],
          backgroundColor: ['#ef4444', '#3b82f6', '#facc15'],
        }],
      },
    });

    createChart(scatterChartRef, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Scatter Chart Example',
          data: [
            { x: -10, y: 0 },
            { x: 0, y: 10 },
            { x: 10, y: 5 },
          ],
          backgroundColor: '#3b82f6',
        }],
      },
    });

    createChart(bubbleChartRef, {
      type: 'bubble',
      data: {
        datasets: [{
          label: 'Bubble Chart Example',
          data: [
            { x: 10, y: 20, r: 15 },
            { x: 15, y: 10, r: 10 },
          ],
          backgroundColor: '#22c55e',
        }],
      },
    });

    createChart(pieChartRef, {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
          data: [30, 50, 20],
          backgroundColor: ['#ef4444', '#3b82f6', '#facc15'],
        }],
      },
    });

    createChart(horizontalBarChartRef, {
      type: 'bar',
      data: {
        labels: ['A', 'B', 'C'],
        datasets: [{
          label: 'Horizontal Bar Chart Example',
          data: [12, 19, 3],
          backgroundColor: ['#3b82f6', '#22c55e', '#ef4444'],
        }],
      },
      options: {
        indexAxis: 'y',
      },
    });

    createChart(stackedBarChartRef, {
      type: 'bar',
      data: {
        labels: ['Q1', 'Q2', 'Q3'],
        datasets: [
          {
            label: 'Dataset 1',
            data: [10, 20, 30],
            backgroundColor: '#3b82f6',
          },
          {
            label: 'Dataset 2',
            data: [15, 25, 35],
            backgroundColor: '#22c55e',
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Stacked Bar Chart',
          },
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      },
    });

    createChart(mixedChartRef, {
      type: 'bar',
      data: {
        labels: ['January', 'February'],
        datasets: [
          {
            type: 'line',
            label: 'Line Dataset',
            data: [50, 60],
            borderColor: '#ef4444',
          },
          {
            type: 'bar',
            label: 'Bar Dataset',
            data: [30, 40],
            backgroundColor: '#3b82f6',
          },
        ],
      },
    });

    createChart(areaChartRef, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar'],
        datasets: [{
          label: 'Area Chart Example',
          data: [10, 20, 15],
          fill: true,
          backgroundColor: 'rgba(34, 197, 94, 0.2)',
          borderColor: '#22c55e',
        }],
      },
    });

    // Cleanup function
    return () => {
      if (performanceChartInstance.current) {
        performanceChartInstance.current.destroy();
      }
      if (conversionChartInstance.current) {
        conversionChartInstance.current.destroy();
      }
      chartInstances.forEach((chart) => chart.destroy());
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-[400px]"><canvas ref={lineChartRef} /></div>
        <div className="h-[400px]"><canvas ref={radarChartRef} /></div>
        <div className="h-[400px]"><canvas ref={polarAreaChartRef} /></div>
        <div className="h-[400px]"><canvas ref={scatterChartRef} /></div>
        <div className="h-[400px]"><canvas ref={bubbleChartRef} /></div>
        <div className="h-[400px]"><canvas ref={pieChartRef} /></div>
        <div className="h-[400px]"><canvas ref={horizontalBarChartRef} /></div>
        <div className="h-[400px]"><canvas ref={stackedBarChartRef} /></div>
        <div className="h-[400px]"><canvas ref={mixedChartRef} /></div>
        <div className="h-[400px]"><canvas ref={areaChartRef} /></div>
      </div>
    </div>
  );
}