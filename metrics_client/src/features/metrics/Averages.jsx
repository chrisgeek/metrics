import { useState, useEffect } from 'react'
import { API_URL } from '../../constants.js'
// import { useNavigate } from 'react-router-dom';

function Averages(){
  const [metrics, setMetrics] = useState([]);
  const [timeframe, setTimeframe] = useState('hour');
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);
  // const navigate = useNavigate();

  useEffect(()=>{
    async function loadMetrics(){
      try{
        const res = await fetch(`${API_URL}/averages?timeframe=${timeframe}`);
        if(res.ok) {
          const data = await res.json() // convert to json
          setMetrics(data)
        }
        else {
          throw res;
        }
      }
      catch(e){
        setError('An error occurred' );
        console.log('An error occured', e);
      }
      finally{
        setLoading(false);
      }
    }
    loadMetrics();
  }, []);

    return(
    <div>
      <h2>Average Values based on Timeframe</h2>
      <div>
        <label htmlFor="selectOption">Select timeframe(default is hourly) </label>
        <select id="selectOption" value={timeframe} onChange={e => setTimeframe(e.target.value)}>
          <option value="minute">Minute</option>
          <option value="hourly">Hourly</option>
          <option value="daily">Daily</option>
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
          {metrics.map((metric, index)=>(
            <tr key={index}>
              <td>{metric.name}</td>
              <td>{metric.average_value}</td>
              <td>{new Date(metric.selected_timeframe).toLocaleString()}</td>
              <td>{metric.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Averages;
