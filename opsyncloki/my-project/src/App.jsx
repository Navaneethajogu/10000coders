// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import AdminDashboard from './admin/Admindashboard';
import TrainerDashboard from './trainer/Trainerdashboard';
import TraineeDashboard from './trainee/Traineedashboard';
import LoginPage  from './trainer/TrainerLogin'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/" element={<AdminDashboard />} />
        <Route path="/trainer" element={<TrainerDashboard />} />
        <Route path="/trainee" element={<TraineeDashboard />} />
        <Route path="/trainerlogin" element={<LoginPage />} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;