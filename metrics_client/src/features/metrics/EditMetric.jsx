import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { API_URL } from '../../../constant.js';

function EditMetric(){
  const [metric, setMetric] = useState(null);
  const { id } = useParams();
  const [, setError] = useState(null);
  const [, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: metric.name,
        timestamp: metric.timestamp,
        value: metric.value,
      }),
    });

    if(res.ok){
      const { id } = await res.json();
      navigate(`/metrics/${id}`);
    }
    else{ console.log(res) }
  }

  useEffect(() => {
     const fetchCurrentMetric = async () => {
       try {
         const res = await fetch(`${API_URL}/${id}`);
         if (res.ok){
            const json = await res.json();
            setMetric(json);
         }
         else {
           throw res;
         }
       }
       catch(e){
         setError(e);
       }
       finally{
         setLoading(false);
       }
  };
     fetchCurrentMetric();
   }, [id]);

  if (!metric) return <h2>Loading...</h2>
  return(
    <div>
       <h2>New Metric</h2>
        <form onSubmit={handleSubmit} >
        <div>
          <label htmlFor="nameInput">Name</label>
          <input
            id="nameInput"
            type="text"
            value={metric.name}
            onChange={(e) => setMetric({...metric, name: e.target.value })}
            required
          /><br/>
          <label htmlFor="bodyInput">Timestamp</label>
          <input
            type="datetime-local"
            id="timestampInput"
            value={metric.timestamp}
            onChange={(e) => setMetric({...metric, timestamp: e.target.value})}
            required
          /><br/>
          <input
            id="valueInput"
            type="number"
            value={metric.value}
            onChange={(e) => setMetric({...metric, value: e.target.value })}
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

export default EditMetric;
