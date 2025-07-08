export interface DataPoint {
  concentration: number;
  voltage: number;
}

export interface AnalysisResult {
  slope: number;
  intercept: number;
  rSquared: number;
  deviationPercentage: number;
  idealSlope: number;
} 