import { DataPoint, AnalysisResult } from './types';

export function calculateLinearRegression(points: DataPoint[]): AnalysisResult | null {
  if (points.length < 2) return null;

  // Convert concentrations to log scale
  const xValues = points.map(p => Math.log10(p.concentration));
  const yValues = points.map(p => p.voltage);

  const n = points.length;
  const sumX = xValues.reduce((a, b) => a + b, 0);
  const sumY = yValues.reduce((a, b) => a + b, 0);
  const sumXY = xValues.reduce((a, b, i) => a + b * yValues[i], 0);
  const sumXX = xValues.reduce((a, b) => a + b * b, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  // Calculate R-squared
  const yMean = sumY / n;
  const totalSS = yValues.reduce((a, y) => a + Math.pow(y - yMean, 2), 0);
  const residualSS = yValues.reduce((a, y, i) => {
    const yPred = slope * xValues[i] + intercept;
    return a + Math.pow(y - yPred, 2);
  }, 0);
  const rSquared = 1 - (residualSS / totalSS);

  // Calculate ideal Nernstian slope (59.2 mV/decade at 25°C)
  const idealSlope = 59.2;
  const deviationPercentage = Math.abs((slope - idealSlope) / idealSlope * 100);

  return {
    slope,
    intercept,
    rSquared,
    deviationPercentage,
    idealSlope
  };
} 