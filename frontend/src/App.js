// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ShortenURL from './pages/ShortenURL';
import AnalyticsPage from './pages/AnalyticsPage'; // New

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/shorten" element={<ShortenURL />} />
      <Route path="/analytics/:code" element={<AnalyticsPage />} /> 
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
