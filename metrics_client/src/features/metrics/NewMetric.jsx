import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../constant.js';

function NewMetric(){
  const [name, setName] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const metricData = { name, timestamp, value };
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(metricData),
    });

    if(res.ok){
      const { id } = await res.json();
      navigate(`/metrics/${id}`);
    }
    else{ console.log(res) }
  }

  return(
      <div>
        <h2>New Metric</h2>
        <form onSubmit={handleSubmit} >
        <div>
          <label htmlFor="nameInput">Name</label>
          <input
            id="nameInput"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          /><br/>
          <label htmlFor="timestampInput">Timestamp</label>
          <input
            id="timestampInput"
            type="datetime-local"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            required
          /><br/>

           <input
            id="valueInput"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          /><br/>
        </div>
          <div>
          <button type="submit">Submit</button>
          </div>
        </form>
      </div>
  )
}

export default NewMetric;
