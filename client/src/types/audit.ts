export interface PerformanceMetrics {
  lcp: string;
  cls: string;
  tti: string;
  memoryUsage: string;
}

export interface BehavioralChecks {
  scarcityTriggers: boolean;
  socialProof: boolean;
  authorityIndicators: boolean;
  commitmentDevices: boolean;
}

export interface AuditReport {
  strategicFoundation: string;
  performanceMetrics: PerformanceMetrics;
  behavioralChecks: BehavioralChecks;
  technicalEnhancements: string[];
  implementationRoadmap: string[];
  universalConversionDrivers: string[];
  benchmarks: string[];
}

export interface AuditData {
  strategicFoundation: {
    title: string;
    content: string;
  };
  performanceMetrics: {
    lcp: number;
    cls: number;
    tti: number;
    memoryUsage: number;
  };
  behavioralChecks: {
    scarcityTriggers: string[];
    urgencyTriggers: string[];
    socialProof: string[];
  };
  technicalEnhancements: {
    recommendations: string[];
  };
  implementationRoadmap: {
    steps: string[];
  };
  universalConversionDrivers: {
    drivers: string[];
  };
  benchmarks: {
    metrics: string[];
  };
} 