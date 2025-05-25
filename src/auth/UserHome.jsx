import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Dashboard from '../modules/Dashboard/Dashboard';
import Transactions from '../modules/Transactions';
import Categories from '../modules/Categories';
import Reports from '../modules/Report';
import Budget from '../modules/Budget';
import Profile from '../modules/profil/Profile';

const UserHome = () => (
  <div className="flex min-h-screen bg-base-200">
    <div className="flex-1 flex flex-col">
      <Navbar />
      <main className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="categories" element={<Categories />} />
          <Route path="reports" element={<Reports />} />
          <Route path="budget" element={<Budget />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  </div>
);

export default UserHome;