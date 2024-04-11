import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './features/Navbar.jsx'; 
import AppRoutes from './AppRoutes.jsx';


function App() {

  return (
    <Router>
      <NavBar />
      <AppRoutes />
    </Router>
  )
}

export default App
