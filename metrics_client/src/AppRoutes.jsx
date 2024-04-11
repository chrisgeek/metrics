import React from 'react';
import MetricsList from './features/metrics/MetricsList.jsx'
import MetricDetails from './features/metrics/MetricDetails.jsx'
import NewMetric from './features/metrics/NewMetric.jsx'
import EditMetric from './features/metrics/EditMetric.jsx'
import DeleteMetric from './features/metrics/DeleteMetric.jsx'
import { Route, Routes } from 'react-router-dom'

function AppRoutes(){
  return(
    <Routes>
      <Route path = '/' element={<MetricsList />} />  
      <Route path = 'metrics/:id' element={<MetricDetails />} /> 
      <Route path = '/new' element={< NewMetric />} />
      <Route path = '/metrics/:id/edit' element={< EditMetric />} />
      <Route path = '/metrics/:id/delete' element={< DeleteMetric />} />
    </Routes>
  );
}

export default AppRoutes;
