'use client'

import { useState } from 'react'

export default function CalibrationConfig() {
  const [temperature, setTemperature] = useState('25')
  const [ionCharge, setIonCharge] = useState('1')

  const handleTemperatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (!isNaN(parseFloat(value)) && parseFloat(value) >= 0 && parseFloat(value) <= 100) {
      setTemperature(value)
    }
  }

  const handleIonChargeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (!isNaN(parseInt(value)) && parseInt(value) >= 1 && parseInt(value) <= 4) {
      setIonCharge(value)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Calibration Settings</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Temperature (°C)
          </label>
          <input
            type="number"
            value={temperature}
            onChange={handleTemperatureChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            min="0"
            max="100"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ion Charge (z)
          </label>
          <input
            type="number"
            value={ionCharge}
            onChange={handleIonChargeChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            min="1"
            max="4"
            step="1"
          />
        </div>
      </div>
    </div>
  )
} 