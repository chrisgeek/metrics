import React, { useState, useEffect } from 'react'
import { API_URL } from '../../../constant.js'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';


function MetricsList(){
  const [metrics, setMetrics] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    async function loadMetrics(){
      try{
        const res = await fetch(API_URL);
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

    const deleteMetric = async (id)=>{
    try{
      const res = await fetch(`${API_URL}${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
      });

      if(res.ok){
        setMetrics(metrics.filter((metric) => metric.id !== id));
      }
      else{
        throw res;
      }
    }
    catch(e){
      console.log(e);
    }
  }

  return(
    <div>
      <h2>Metric Lists</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Value</th>
            <th>Timestamp</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
      {metrics.map((metric)=>(
        <tr key={metric.id}>
              <td>{metric.id}</td>
              <td>{metric.name}</td>
              <td>{metric.value}</td>
              <td>{new Date(metric.timestamp).toLocaleString()}</td>
               <td> 
                 <span>
                   <button  onClick={() => navigate(`/metrics/${metric.id}/edit`)}>Edit</button> </span>
                 {/* <Link to={`/metrics/${metric.id}/edit`}> Edit </Link>{' | '} */}
              <span>
                <button onClick={() => deleteMetric(metric.id)}>Delete</button></span> 
               </td> 
            </tr>
          ))}
        </tbody>
      </table>
      </div>
  );

        {/* <div key={metric.id} className="metric-container"> */}
        {/*   {/1* <Link to={`/metrics/${metric.id}`}> *1/} */}
        {/*     <p><span>Name: </span>{metric.name}</p> */}
        {/*     <p><span>Timestamp: </span>{metric.timestamp}</p> */}
        {/*     <p><span>Value: </span>{metric.value}</p> */}
        {/*   <p></p> */}
        {/*   {/1* </Link> *1/} */}
        {/*   <br /> */}
        {/*    {/1* <Link to={`/metrics/${metric.id}/edit`}> *1/} */}
        {/*      {/1* Edit *1/} */}
        {/*    {/1* </Link>{' | '} *1/} */}
        {/*   {/1* <button onClick={ () => deletePost(metric.id) }> *1/} */}
        {/*   {/1*    Delete *1/} */}
        {/*   {/1* </button> *1/} */}
        {/* </div> */}
      {/* ))} */}    
    {/* </div> */}
  {/* ); */}
}

export default MetricsList;
