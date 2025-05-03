import { useState } from 'react'
import './App.scss'
import LandingPage from './auth/LandingPage'
import Login from './auth/Login'
import Register from './auth/Register'

function App() {
  const [count, setCount] = useState(0)

  return <Register/>
}

export default App
