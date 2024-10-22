// src/App.js
import React, { useState } from 'react';
import Papa from 'papaparse';
import Plot from './Plot';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setLoading(true);
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.meta.fields.length < 2) {
            alert('CSV must contain at least two columns for plotting.');
            setLoading(false);
            return;
          }
          setHeaders(results.meta.fields);
          setData(results.data);
          setLoading(false);
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
          alert('Failed to parse CSV file.');
          setLoading(false);
        },
      });
    }
  };

  return (
    <div className="App">
      <h1>CSV Plotter</h1>
      <div className="file-upload">
        <input type="file" accept=".csv" onChange={handleFileUpload} />
      </div>
      {loading ? (
        <div className="loading-message">Loading...</div>
      ) : data.length > 0 && headers.length > 1 ? (
        <div className="chart-container">
          <Plot data={data} headers={headers} />
        </div>
      ) : (
        <p>Please upload a CSV file with at least two columns.</p>
      )}
    </div>
  );
}

export default App;
