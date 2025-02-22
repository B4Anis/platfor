import { useState } from 'react'
import './Dashboard.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

// Sample data for the runoff triangle
const runoffData = {
  headers: ['Development_Year', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  rows: [
    { year: '2014', values: [2.714988e+08, 1.492500e+09, 4.059528e+08, 6.649640e+08, 4.285817e+07, 1.268917e+08, 5.054396e+07, 2.342005e+08, 0, 0] },
    { year: '2015', values: [1.884429e+09, 2.876935e+09, 2.893737e+09, 3.997651e+08, 1.400884e+08, 4.928554e+07, 2.230085e+08, 1.577677e+07, 0, 0] },
    { year: '2016', values: [2.350275e+08, 8.291096e+08, 2.395051e+08, 1.549431e+08, 2.331348e+08, 1.105418e+08, 7.883175e+07, 2.696726e+07, 0, 0] },
    { year: '2017', values: [1.355774e+09, 3.334419e+09, 3.350317e+09, 3.472412e+08, 1.439926e+08, 3.638070e+07, 1.568734e+07, 0, 0, 0] },
    { year: '2018', values: [3.120300e+08, 7.949720e+08, 8.688508e+08, 4.350555e+08, 1.301456e+08, 1.179323e+09, 0, 0, 0, 0] },
    { year: '2019', values: [3.113907e+08, 1.769238e+09, 3.663016e+09, 3.395674e+08, 5.339265e+08, 0, 0, 0, 0, 0] },
    { year: '2020', values: [2.743859e+08, 4.581547e+08, 4.467660e+08, 1.362108e+08, 0, 0, 0, 0, 0, 0] },
    { year: '2021', values: [1.422131e+09, 2.606994e+09, 5.022379e+09, 0, 0, 0, 0, 0, 0, 0] },
    { year: '2022', values: [5.621894e+08, 1.271713e+09, 0, 0, 0, 0, 0, 0, 0, 0] },
    { year: '2023', values: [3.091934e+08, 0, 0, 0, 0, 0, 0, 0, 0, 0] }
  ]
}

const formatNumber = (num: number) => {
  if (num === 0) return '-'
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 2
  }).format(num)
}

const Dashboard = () => {
  const [selectedMetric, setSelectedMetric] = useState('cumulative')
  const [selectedYear, setSelectedYear] = useState<string | null>(null)

  const getHeatmapColor = (value: number, maxValue: number) => {
    if (value === 0) return 'transparent'
    const intensity = Math.log(value) / Math.log(maxValue)
    return `rgba(37, 99, 235, ${intensity * 0.5})`
  }

  const maxValue = Math.max(...runoffData.rows.flatMap(row => row.values))

  // Calculate summary metrics
  const totalClaims = runoffData.rows.reduce((sum, row) => 
    sum + row.values.reduce((a, b) => a + b, 0), 0
  )
  
  const averageClaim = totalClaims / runoffData.rows.reduce((count, row) => 
    count + row.values.filter(v => v > 0).length, 0
  )

  const latestYear = Math.max(...runoffData.rows.map(row => parseInt(row.year)))

  // Prepare data for line chart
  const lineChartData = {
    labels: runoffData.headers.slice(1).map(year => `Year ${year}`),
    datasets: runoffData.rows.map((row, index) => ({
      label: row.year,
      data: row.values,
      borderColor: `hsl(${index * 36}, 70%, 50%)`,
      backgroundColor: `hsla(${index * 36}, 70%, 50%, 0.1)`,
      tension: 0.4,
      fill: false
    }))
  }

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Claims Development by Accident Year'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => formatNumber(value)
        }
      }
    }
  }

  return (
    <div className="dashboard">
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="label">Total Claims</div>
          <div className="value">{formatNumber(totalClaims)}</div>
          <div className="trend positive">+12.3% vs last year</div>
        </div>
        <div className="metric-card">
          <div className="label">Average Claim</div>
          <div className="value">{formatNumber(averageClaim)}</div>
          <div className="trend negative">-3.8% vs last year</div>
        </div>
        <div className="metric-card">
          <div className="label">Latest Year</div>
          <div className="value">{latestYear}</div>
          <div className="trend">Updated 2 days ago</div>
        </div>
      </div>

      <div className="runoff-table-container">
        <div className="table-header">
          <h2>Runoff Triangle</h2>
          <div className="table-actions">
            <button className="action-button secondary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Export CSV
            </button>
            <button className="action-button primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              Upload Data
            </button>
          </div>
        </div>
        <table className="runoff-table">
          <thead>
            <tr>
              <th>Accident Year</th>
              {runoffData.headers.slice(1).map((header, index) => (
                <th key={header}>Year {header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {runoffData.rows.map((row) => (
              <tr 
                key={row.year}
                className={selectedYear === row.year ? 'selected' : ''}
                onClick={() => setSelectedYear(row.year)}
              >
                <td className="year-cell">{row.year}</td>
                {row.values.map((value, index) => (
                  <td 
                    key={index}
                    style={{ backgroundColor: getHeatmapColor(value, maxValue) }}
                  >
                    {formatNumber(value)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Claims Development</h3>
            <div className="chart-controls">
              <button className={`chart-control ${selectedMetric === 'cumulative' ? 'active' : ''}`} onClick={() => setSelectedMetric('cumulative')}>
                Cumulative
              </button>
              <button className={`chart-control ${selectedMetric === 'incremental' ? 'active' : ''}`} onClick={() => setSelectedMetric('incremental')}>
                Incremental
              </button>
            </div>
          </div>
          <Line 
            data={lineChartData}
            options={lineChartOptions}
          />
        </div>
        <div className="chart-card">
          <div className="chart-header">
            <h3>Total Claims by Year</h3>
            <div className="chart-controls">
              <button className="chart-control active">All Years</button>
            </div>
          </div>
          <Bar
            data={{
              labels: runoffData.rows.map(row => row.year),
              datasets: [{
                label: 'Total Claims',
                data: runoffData.rows.map(row => row.values.reduce((a, b) => a + b, 0)),
                backgroundColor: '#3b82f6',
                borderRadius: 4
              }]
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: (value) => formatNumber(Number(value))
                  }
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
