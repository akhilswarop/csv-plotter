// src/Plot.js
import React, { useState } from 'react';
import { Line, Bar, Scatter } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import './Plot.css';

Chart.register(...registerables);

function Plot({ data, headers }) {
  const [xKey, setXKey] = useState(headers[0]);
  const [yKey, setYKey] = useState(headers[1]);
  const [chartType, setChartType] = useState('line');

  const isScatter = chartType === 'scatter';

  const chartData = isScatter
    ? {
        datasets: [
          {
            label: `${yKey} vs ${xKey}`,
            data: data.map((row) => ({ x: row[xKey], y: row[yKey] })),
            backgroundColor: 'rgba(75,192,192,1)',
          },
        ],
      }
    : {
        labels: data.map((row) => row[xKey]),
        datasets: [
          {
            label: `${yKey} vs ${xKey}`,
            data: data.map((row) => row[yKey]),
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
          },
        ],
      };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart`,
      },
    },
  };

  return (
    <div className="plot-container">
      <div className="controls">
        <div className="control-group">
          <label htmlFor="x-axis">X-Axis:</label>
          <select
            id="x-axis"
            value={xKey}
            onChange={(e) => setXKey(e.target.value)}
          >
            {headers.map((header) => (
              <option key={`x-${header}`} value={header}>
                {header}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="y-axis">Y-Axis:</label>
          <select
            id="y-axis"
            value={yKey}
            onChange={(e) => setYKey(e.target.value)}
          >
            {headers.map((header) => (
              <option key={`y-${header}`} value={header}>
                {header}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="chart-type">Chart Type:</label>
          <select
            id="chart-type"
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
          >
            <option value="line">Line</option>
            <option value="bar">Bar</option>
            <option value="scatter">Scatter</option>
          </select>
        </div>
      </div>

      <div className="chart">
        {chartType === 'line' && <Line data={chartData} options={options} />}
        {chartType === 'bar' && <Bar data={chartData} options={options} />}
        {chartType === 'scatter' && <Scatter data={chartData} options={options} />}
      </div>
    </div>
  );
}

export default Plot;
