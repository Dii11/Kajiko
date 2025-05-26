import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import BudgetList from './BudgetList';
import BudgetSuivi from './BudgetSuivi';
import BudgetAlert from './BudgetAlert';

const BudgetRoutes = () => (
  <Routes>
    <Route path="list" element={<BudgetList />} />
    <Route path="suivi" element={<BudgetSuivi />} />
    <Route path="alert" element={<BudgetAlert />} />
    <Route path="*" element={<Navigate to="list" />} />
  </Routes>
);

export default BudgetRoutes;