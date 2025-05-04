import './App.scss'
import LandingPage from './auth/LandingPage'
import Login from './auth/Login'
import Register from './auth/Register'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {

  return <Router>
    <Routes>
      <Route exact path="/" element={<LandingPage/>}/>
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/register" element={<Register/>}/>
    </Routes>
  </Router>
}

export default App
