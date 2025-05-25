import './App.scss'
import LandingPage from './auth/LandingPage'
import Login from './auth/Login'
import Register from './auth/Register'
import UserHome from './auth/UserHome' // <-- Ajoute ce composant (crée-le si besoin)
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {

  return <Router>
    <Routes>
      <Route exact path="/" element={<LandingPage/>}/>
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/register" element={<Register/>}/>
      <Route exact path="/home/*" element={<UserHome/>}/> {/* Page principale utilisateur */}
    </Routes>
  </Router>
}

export default App
