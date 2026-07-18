import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './Login'; // Changed from Login to LoginPage
import AdminDashboard from './admin/AdminDashboard';
import TrainerDashboard from './trainer/Trainerdashboard';
import TraineeDashboard from './trainee/Traineedashboard';
import TrainerLogin from './trainer/TrainerLogin';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} /> {/* Updated to LoginPage */}
        <Route path="/admin/" element={<AdminDashboard />} />
        <Route path="/trainer" element={<TrainerDashboard />} />
        <Route path="/trainee" element={<TraineeDashboard />} />
        <Route path="/trainerlogin" element={<TrainerLogin />} /> {/* Fixed import name */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;