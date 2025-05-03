import { useState } from 'react'
import './App.scss'
import LandingPage from './auth/LandingPage'
import Login from './auth/Login'

function App() {
  const [count, setCount] = useState(0)

  return <Login/>
}

export default App
