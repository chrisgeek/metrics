import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../../../constant.js'

function MetricDetails(){
  const [metric, setMetric] = useState('');
  const { id } = useParams();
  const navigate = useNavigate('');

  const deleteCurrentMetric = async () => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
      "Content-Type": "application/json",
    },
    });
    if(res.ok) {
      navigate('/')
    }
    else{ console.log(res); }
  };

   useEffect(() => {
     const fetchCurrentMetric = async () => {
       try {
         const res = await fetch(`${API_URL}/${id}`);
         if (res.ok){
            const json = await res.json();
            setMetric(json);
           console.log(metric);
         }
         else {
           throw res;
         }
       }
       catch(e){
          console.log(e);
       }
  };
     fetchCurrentMetric();
   }, [id]);

  if(!metric) return <h2>Loading...</h2>;
  return(
      <div>
      <h2>{metric.name}</h2>
      <h2>{metric.timestamp}</h2>
      <h2>{metric.value}</h2>
        <Link to='/'>Back to Metrics</Link>
        {' | '}
        <button onClick={ ()=> deleteCurrentMetric() }>
          Delete
        </button>
      </div>
      )
}

export default MetricDetails;
