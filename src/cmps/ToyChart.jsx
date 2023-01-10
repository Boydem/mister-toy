import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js'
import { Doughnut, PolarArea } from 'react-chartjs-2'

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)

export function ToyChart({ label, chartType, labelsMap }) {
  function switchChartType() {
    switch (chartType) {
      case 'Doughnut':
        return (
          <div className='toy-chart'>
            <h2 className='chart-label'>{label}</h2>
            <Doughnut data={data} />
          </div>
        )
      case 'PolarArea':
        return (
          <div className='toy-chart'>
            <h2 className='chart-label'>{label}</h2>
            <PolarArea data={data} />
          </div>
        )
      default:
        return (
          <div className='toy-chart'>
            <h2 className='chart-label'>{label}</h2>
            <Doughnut data={data} />
          </div>
        )
    }
  }

  const data = {
    labels: Object.keys(labelsMap),
    datasets: [
      {
        label: label,
        data: Object.values(labelsMap),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 2,
      },
    ],
  }
  return switchChartType()
}
