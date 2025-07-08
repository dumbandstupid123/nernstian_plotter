'use client'

import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { DataPoint } from '@/lib/types'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface NernstChartProps {
  points: DataPoint[]
}

export default function NernstChart({ points }: NernstChartProps) {
  const data = {
    datasets: [
      {
        label: 'Voltage vs. log(Concentration)',
        data: points.map(point => ({
          x: Math.log10(point.concentration),
          y: point.voltage
        })),
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        pointRadius: 6,
        pointHoverRadius: 8
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'linear' as const,
        title: {
          display: true,
          text: 'log(Concentration)'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Voltage (mV)'
        }
      }
    },
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Nernstian Response Plot'
      }
    }
  }

  return (
    <div className="w-full h-full">
      <Line data={data} options={options} />
    </div>
  )
} 