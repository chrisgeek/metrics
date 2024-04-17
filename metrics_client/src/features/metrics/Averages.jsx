import { useState, useEffect } from 'react';
import { API_URL } from '../../constants.js';

function Averages() {
  const [metrics, setMetrics] = useState([]);
  const [timeframe, setTimeframe] = useState('hour');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadMetrics() {
      setLoading(true);
      setError(null);
      
      try {
        const res = await fetch(`${API_URL}/averages?timeframe=${timeframe}`);
        if (res.ok) {
          const data = await res.json();
          setMetrics(data);
        } else {
          throw res;
        }
      } catch (e) {
        setError('An error occurred');
        console.error('An error occurred', e);
      } finally {
        setLoading(false);
      }
    }

    loadMetrics();
  }, [timeframe]);

  return (
    <div>
      <h2>Average Values based on Timeframe</h2>
      <div>
        <label htmlFor="selectOption">Select timeframe (default is hourly)</label>
        <select id="selectOption" value={timeframe} onChange={e => setTimeframe(e.target.value)}>
          <option value="minute">Minute</option>
          <option value="hour">Hourly</option>
          <option value="day">Daily</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Metric Name</th>
            <th>Average Value</th>
            <th>Timeframe</th>
            <th>Number of Records</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4">Loading...</td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="4">Error: {error}</td>
            </tr>
          ) : (
            metrics.map((metric, index) => (
              <tr key={index}>
                <td>{metric.name}</td>
                <td>{metric.average_value}</td>
                <td>{new Date(metric.selected_timeframe).toLocaleString()}</td>
                <td>{metric.count}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Averages;
