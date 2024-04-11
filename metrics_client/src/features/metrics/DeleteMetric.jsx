import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../constant.js';

function DeleteMetric(){
  const { id } = useParams();
  const navigate = useNavigate('');

  useEffect(()=>{
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
    deleteCurrentMetric();
  }, [id, navigate]);
}

export default DeleteMetric;
