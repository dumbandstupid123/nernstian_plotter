'use client'

import { useState } from 'react'
import { DataPoint, AnalysisResult } from '@/lib/types'
import { calculateLinearRegression } from '@/lib/analysis'

interface DataInputProps {
  points: DataPoint[]
  setPoints: (points: DataPoint[]) => void
  setAnalysisResult: (result: AnalysisResult | null) => void
}

export default function DataInput({ points, setPoints, setAnalysisResult }: DataInputProps) {
  const [concentration, setConcentration] = useState('')
  const [voltage, setVoltage] = useState('')

  const handleAddPoint = () => {
    const newPoint = {
      concentration: parseFloat(concentration),
      voltage: parseFloat(voltage)
    }

    if (isNaN(newPoint.concentration) || isNaN(newPoint.voltage)) {
      alert('Please enter valid numbers')
      return
    }

    const newPoints = [...points, newPoint].sort((a, b) => a.concentration - b.concentration)
    setPoints(newPoints)
    setAnalysisResult(calculateLinearRegression(newPoints))
    setConcentration('')
    setVoltage('')
  }

  const handleClear = () => {
    setPoints([])
    setAnalysisResult(null)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Data Points</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Concentration (M)
          </label>
          <input
            type="number"
            value={concentration}
            onChange={(e) => setConcentration(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            placeholder="e.g., 0.001"
            step="any"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Voltage (mV)
          </label>
          <input
            type="number"
            value={voltage}
            onChange={(e) => setVoltage(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            placeholder="e.g., 120"
            step="any"
          />
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleAddPoint}
            className="flex-1 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Add Point
          </button>
          <button
            onClick={handleClear}
            className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
          >
            Clear All
          </button>
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Current Points:</h3>
          <div className="max-h-40 overflow-y-auto">
            {points.map((point, index) => (
              <div key={index} className="text-sm text-gray-600">
                {point.concentration.toExponential(3)} M → {point.voltage.toFixed(1)} mV
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 