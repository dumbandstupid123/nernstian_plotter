'use client'

import { AnalysisResult } from '@/lib/types'

interface AnalysisResultsProps {
  result: AnalysisResult | null
}

export default function AnalysisResults({ result }: AnalysisResultsProps) {
  if (!result) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
        <p className="text-gray-500">Add at least two points to see analysis results.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
      
      <div className="space-y-3">
        <div>
          <span className="text-sm font-medium text-gray-700">Slope:</span>
          <span className="ml-2 text-sm">{result.slope.toFixed(1)} mV/decade</span>
        </div>
        
        <div>
          <span className="text-sm font-medium text-gray-700">Intercept:</span>
          <span className="ml-2 text-sm">{result.intercept.toFixed(1)} mV</span>
        </div>
        
        <div>
          <span className="text-sm font-medium text-gray-700">R²:</span>
          <span className="ml-2 text-sm">{result.rSquared.toFixed(4)}</span>
        </div>
      </div>
    </div>
  )
} 