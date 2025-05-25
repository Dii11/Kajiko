import './App.scss'
import LandingPage from './auth/LandingPage'
import Login from './auth/Login'
import Register from './auth/Register'
import UserHome from './auth/UserHome'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserByEmail, logout } from './features/userSlice';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);

  useEffect(() => {
    const token = localStorage.getItem('token');
    try {
      if (token) {
        const { email } = jwtDecode(token);
        email ? dispatch(fetchUserByEmail(email)) : dispatch(logout());
      } else {
        dispatch(logout());
      }
    } catch {
      dispatch(logout());
    }
  }, [dispatch]);

  console.log("Utilisateur récupéré dans App.jsx :", user);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home/*" element={<UserHome />} />
      </Routes>
    </Router>
  );
}

export default App;
