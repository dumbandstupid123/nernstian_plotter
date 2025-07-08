'use client'

import { AnalysisResult } from '@/lib/types'

interface ValidationResultsProps {
  result: AnalysisResult | null
}

export default function ValidationResults({ result }: ValidationResultsProps) {
  if (!result) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Validation</h2>
        <p className="text-gray-500">Add at least two points to see validation results.</p>
      </div>
    )
  }

  const isNernstian = result.deviationPercentage <= 10
  const hasGoodFit = result.rSquared >= 0.99

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Validation</h2>
      
      <div className="space-y-4">
        <div>
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full ${isNernstian ? 'bg-green-500' : 'bg-red-500'} mr-2`} />
            <span className="text-sm font-medium">Nernstian Response</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {isNernstian
              ? 'The slope is within 10% of the ideal Nernstian value.'
              : 'The slope deviates significantly from the ideal Nernstian value.'}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Deviation: {result.deviationPercentage.toFixed(1)}%
          </p>
        </div>

        <div>
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full ${hasGoodFit ? 'bg-green-500' : 'bg-red-500'} mr-2`} />
            <span className="text-sm font-medium">Linear Response</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {hasGoodFit
              ? 'The data shows good linearity.'
              : 'The data shows poor linearity.'}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            R² = {result.rSquared.toFixed(4)}
          </p>
        </div>
      </div>
    </div>
  )
} 