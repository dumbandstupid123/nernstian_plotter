'use client'

import { useState } from 'react'
import DataInput from '@/components/DataInput'
import NernstChart from '@/components/NernstChart'
import AnalysisResults from '@/components/AnalysisResults'
import CalibrationConfig from '@/components/CalibrationConfig'
import ValidationResults from '@/components/ValidationResults'
import { DataPoint, AnalysisResult } from '@/lib/types'

export default function Home() {
  const [points, setPoints] = useState<DataPoint[]>([])
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Nernstian Plotter</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <CalibrationConfig />
            <DataInput 
              points={points} 
              setPoints={setPoints}
              setAnalysisResult={setAnalysisResult}
            />
          </div>
          
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6 h-[800px]">
              <NernstChart points={points} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnalysisResults result={analysisResult} />
              <ValidationResults result={analysisResult} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 