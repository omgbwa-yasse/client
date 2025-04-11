// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import Project from './pages/Project';
import './App.css'; 

function App() {
  return (
    <Router>
       
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/project" element={<Project />} />
        <Route path="*" element={<div>Page non trouvée</div>} />
      </Routes>
    </Router>
  );
}

export default App;