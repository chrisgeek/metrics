import { Link } from 'react-router-dom'

function NavBar(){
  return(
    <nav>
      <Link to='/'>View Metrics</Link> 
      {' | '}
      <Link to='/new'>New Metric</Link> 
      {' | '}
      <Link to='/metrics/averages'>Show Time Averages</Link>
    </nav>
  )
}

export default NavBar;
